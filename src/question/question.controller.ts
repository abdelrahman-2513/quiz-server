import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Response } from 'express';
import { UpdateQuestionDto } from './dtos/update-question.dto';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Res() res: Response) {
    const question = await this.questionService.create(createQuestionDto);
    return res.status(HttpStatus.CREATED).json({ message: 'Question created successfully', question });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionService.findOneById(id);
    return res.status(HttpStatus.OK).json({ message: 'Question retrieved successfully', question });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto, @Res() res: Response) {
    const updatedQuestion = await this.questionService.update(id, updateQuestionDto);
    return res.status(HttpStatus.OK).json({ message: 'Question updated successfully', updatedQuestion });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.questionService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Question deleted successfully' });
  }
}
