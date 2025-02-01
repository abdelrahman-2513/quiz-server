import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuizResult } from './schemas/quiz-result.schema';
import { Model } from 'mongoose';
import { CreateQuizResultDto } from './dtos/create-quiz-result.dto';
import { IQuizResult } from './interfaces/quiz-result.interface';
import { UpdateQuizResultDto } from './dtos/update-quiz-result.dto';
import { Request } from 'express';
import { ATPayload } from 'src/auth/types/access-token-payload.type';
import { QuizService } from 'src/quiz/quiz.service';
import { Question } from 'src/question/schemas/question.schema';

@Injectable()
export class QuizResultService {
    constructor(
        @Inject(forwardRef(() => QuizService))
            private readonly quizService: QuizService,
        @InjectModel(QuizResult.name) private readonly quizResultModel: Model<QuizResult>) { }

    async create(createQuizResultDto: CreateQuizResultDto,req:Request): Promise<IQuizResult> {
        const user= req["user"] as ATPayload;
        const quiz = await this.quizService.findOne(createQuizResultDto.quiz);
        createQuizResultDto.score = 0;
        const questionScore = quiz.questions.length > 0 ? 100 / quiz.questions.length :  0;
        if(quiz)
        {
            for(const answer of createQuizResultDto.answers)
            {
                const question  = quiz.questions.find((question) => question._id.toString() === answer.questionId);
                if(question)
                {
                    if(question["answer"] === answer.selectedAnswer)
                    {
                        createQuizResultDto.score = createQuizResultDto.score + questionScore;
                    }
                }
            }
        }
        if(createQuizResultDto.score >= quiz.passingScore)
        {
            createQuizResultDto.passed = true;
        }else
        {
            createQuizResultDto.passed = false;
        }
        createQuizResultDto.user = user.sub.toString();
        console.log({createQuizResultDto});
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
