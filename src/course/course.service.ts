import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema.dto';
import { Model, Types } from 'mongoose';
import { CreateCourseDto } from './dtos/create-course.dto';
import { ICourse } from './interfaces/course.interface';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>) {}

    async create(createCourseDto: CreateCourseDto): Promise<ICourse> {
      const createdCourse = new this.courseModel(createCourseDto);
      return createdCourse.save();
    }
  
    async findAll(): Promise<ICourse[]> {
      return this.courseModel.find().populate('teacher').populate('students').exec();
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
        const courses = await this.courseModel.find({ students: studentId }).select('_id');
        return courses.map(course => course._id);
      }
    
       async getCoursesForTeacher(teacherId: string): Promise<Types.ObjectId[]> {
        const courses = await this.courseModel.find({ teacher: teacherId }).select('_id');
        return courses.map(course => course._id);
      }
}
