import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuizDto } from './dtos';
import { Response } from 'express';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto, @Res() res: Response) {
    const quiz = await this.quizService.createQuiz(createQuizDto);
    return res.status(HttpStatus.CREATED).json({ message: 'Quiz created successfully', quiz });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const quizzes = await this.quizService.findAll();
    return res.status(HttpStatus.OK).json({ message: 'Quizzes retrieved successfully', quizzes });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const quiz = await this.quizService.findOne(id);
    return res.status(HttpStatus.OK).json({ message: 'Quiz retrieved successfully', quiz });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto, @Res() res: Response) {
    const updatedQuiz = await this.quizService.update(id, updateQuizDto);
    return res.status(HttpStatus.OK).json({ message: 'Quiz updated successfully', updatedQuiz });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.quizService.delete(id);
    return res.status(HttpStatus.OK).json(result);
  }
}
