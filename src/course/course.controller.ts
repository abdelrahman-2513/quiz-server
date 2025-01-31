import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { Response } from 'express';
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
    async findAll(@Res() res: Response) {
      const courses = await this.courseService.findAll();
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
}
