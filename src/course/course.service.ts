import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema.dto';
import { Model, Types } from 'mongoose';
import { CreateCourseDto } from './dtos/create-course.dto';
import { ICourse } from './interfaces/course.interface';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { Request } from 'express';
import { ATPayload } from 'src/auth/types/access-token-payload.type';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>) { }

  async create(createCourseDto: CreateCourseDto): Promise<ICourse> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(req: Request): Promise<ICourse[]> {
    const user = req["user"] as ATPayload;
    if (user.role === "admin" || user.role === "teacher")
      return this.courseModel.find().populate(['teacher', 'students']).exec();
    const studentId = user.sub;
    const courses = await this.getCoursesForStudent(studentId.toString());
    return this.courseModel.find({ _id: { $in: courses } }).populate(['teacher', 'students']).exec();
  }

  async findOne(id: string): Promise<ICourse> {
    const course = await this.courseModel.findById(id).populate('teacher').populate('students').exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<ICourse> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    if (!updatedCourse) {
      throw new NotFoundException('Course not found');
    }
    return updatedCourse;
  }

  async delete(id: string): Promise<{ message: string }> {
    const course = await this.courseModel.findByIdAndDelete(id).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return { message: 'Course deleted successfully' };
  }

  async getCoursesForStudent(studentId: string): Promise<Types.ObjectId[]> {
    const courses = await this.courseModel.find({ students: { $in: [new Types.ObjectId(studentId)] } }).populate('teacher students').exec();
    if (!courses.length) {
      return []
    }
    return courses.map(course => course._id);
  }

  async getCoursesForTeacher(teacherId: string): Promise<Types.ObjectId[]> {
    const courses = await this.courseModel.find({ teacher: teacherId }).populate('teacher students').exec();
    if (!courses.length) {
      return []
    }
    return courses.map(course => course._id);
  }

  async getTeachersForStudent(studentId: string): Promise<Types.ObjectId[]> {
    const courses = await this.courseModel.find({ students: { $in: new Types.ObjectId(studentId) } }).populate('teacher students').exec();
    if (!courses.length) {
      return []
    }
    return courses.map(course => course.teacher._id);
  }

  async addStudent(courseId: string, studentId: string): Promise<{ message: string }> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    course.students.push(new Types.ObjectId(studentId));
    await course.save();
    return { message: 'Student added to course successfully' };
  }

  async removeStudent(courseId: string, studentId: string): Promise<{ message: string }> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    course.students = course.students.filter(student => student.toString() !== studentId);
    await course.save();
    return { message: 'Student removed from course successfully' };
  }
}
