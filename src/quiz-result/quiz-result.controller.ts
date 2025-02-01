import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CreateQuizResultDto } from './dtos/create-quiz-result.dto';
import { Request, Response } from 'express';
import { QuizResultService } from './quiz-result.service';
import { UpdateQuizResultDto } from './dtos/update-quiz-result.dto';

@Controller('quiz-result')
export class QuizResultController {
    constructor(private readonly quizResultService: QuizResultService) {}

    @Post()
    async create(@Body() createQuizResultDto: CreateQuizResultDto, @Res() res: Response, @Req() req: Request) {
      const quizResult = await this.quizResultService.create(createQuizResultDto,req);
      return res.status(HttpStatus.CREATED).json({ message: 'Quiz result created successfully', quizResult });
    }
  
    @Get()
    async findAll(@Res() res: Response) {
      const quizResults = await this.quizResultService.findAll();
      return res.status(HttpStatus.OK).json({ message: 'Quiz results retrieved successfully', quizResults });
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
      const quizResult = await this.quizResultService.findOne(id);
      return res.status(HttpStatus.OK).json({ message: 'Quiz result retrieved successfully', quizResult });
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateQuizResultDto: UpdateQuizResultDto, @Res() res: Response) {
      const updatedQuizResult = await this.quizResultService.update(id, updateQuizResultDto);
      return res.status(HttpStatus.OK).json({ message: 'Quiz result updated successfully', updatedQuizResult });
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response) {
      const result = await this.quizResultService.delete(id);
      return res.status(HttpStatus.OK).json(result);
    }
}
