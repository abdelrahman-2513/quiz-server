import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuizResult } from './schemas/quiz-result.schema';
import { Model } from 'mongoose';
import { CreateQuizResultDto } from './dtos/create-quiz-result.dto';
import { IQuizResult } from './interfaces/quiz-result.interface';
import { UpdateQuizResultDto } from './dtos/update-quiz-result.dto';

@Injectable()
export class QuizResultService {
    constructor(@InjectModel(QuizResult.name) private readonly quizResultModel: Model<QuizResult>) { }

    async create(createQuizResultDto: CreateQuizResultDto): Promise<IQuizResult> {
        const createdQuizResult = new this.quizResultModel(createQuizResultDto);
        return createdQuizResult.save();
    }

    async findAll(): Promise<IQuizResult[]> {
        return this.quizResultModel.find().exec();
    }

    async findOne(id: string): Promise<IQuizResult> {
        const quizResult = await this.quizResultModel.findById(id).populate('quiz').exec();
        if (!quizResult) {
            throw new NotFoundException('Quiz result not found');
        }
        return quizResult;
    }

    async update(id: string, updateQuizResultDto: UpdateQuizResultDto): Promise<IQuizResult> {
        const updatedQuizResult = await this.quizResultModel.findByIdAndUpdate(id, updateQuizResultDto, { new: true }).exec();
        if (!updatedQuizResult) {
            throw new NotFoundException('Quiz result not found');
        }
        return updatedQuizResult;
    }

    async delete(id: string): Promise<{ message: string }> {
        const quizResult = await this.quizResultModel.findByIdAndDelete(id).exec();
        if (!quizResult) {
            throw new NotFoundException('Quiz result not found');
        }
        return { message: 'Quiz result deleted successfully' };
    }
}
