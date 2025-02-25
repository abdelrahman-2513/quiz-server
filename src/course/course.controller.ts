import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { Request, Response } from 'express';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto, @Res() res: Response) {
      const course = await this.courseService.create(createCourseDto);
      return res.status(HttpStatus.CREATED).json({ message: 'Course created successfully', course });
    }
  
    @Get()
    async findAll(@Res() res: Response,@Req() req:Request) {
      const courses = await this.courseService.findAll(req);
      return res.status(HttpStatus.OK).json({ message: 'Courses retrieved successfully', courses });
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
      const course = await this.courseService.findOne(id);
      return res.status(HttpStatus.OK).json({ message: 'Course retrieved successfully', course });
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Res() res: Response) {
      const updatedCourse = await this.courseService.update(id, updateCourseDto);
      return res.status(HttpStatus.OK).json({ message: 'Course updated successfully', updatedCourse });
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response) {
      const result = await this.courseService.delete(id);
      return res.status(HttpStatus.OK).json(result);
    }

    @Post(':id/add-student/:studentId')
    async addStudent(@Param('id') courseId: string, @Param('studentId') studentId: string, @Res() res: Response) {
      const result = await this.courseService.addStudent(courseId, studentId);
      return res.status(HttpStatus.OK).json(result);
    }

    @Post(':id/remove-student/:studentId')
    async removeStudent(@Param('id') courseId: string, @Param('studentId') studentId: string, @Res() res: Response) {
      const result = await this.courseService.removeStudent(courseId, studentId);
      return res.status(HttpStatus.OK).json(result);
    }
}
