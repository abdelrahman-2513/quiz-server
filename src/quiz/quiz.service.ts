import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Quiz } from "./schemas/quiz.schema";
import { Model } from "mongoose";
import { QuestionService } from "src/question/question.service";
import { CreateQuizDto, UpdateQuizDto } from "./dtos";
import { UpdateQuestionDto } from "src/question/dtos/update-question.dto";
import { IQuestion } from "src/question/interfaces/question.interface";
import { objectIDToString } from "src/common/transformers/objectID-to-string";

@Injectable()
export class QuizService {
    constructor(
        @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
        private readonly questionService: QuestionService
    ) { }

    async createQuiz(createQuizDto: CreateQuizDto): Promise<{ quizId: string; questionIds: string[] }> {
        try {
            const questionIds = await this.questionService.createBulk(createQuizDto.questions);
            const createdQuiz = new this.quizModel({ ...createQuizDto, questions: questionIds });
            await createdQuiz.save();
            return { quizId: createdQuiz._id.toString(), questionIds };
        } catch (e) {
            throw new InternalServerErrorException('Failed to create quiz');
        }
    }

    async findAll(): Promise<Quiz[]> {
        return this.quizModel.find().exec();
    }

    async findOne(id: string): Promise<Quiz> {
        const quiz = await this.quizModel.findById(id).populate('questions').exec();
        if (!quiz) {
            throw new NotFoundException('Quiz not found');
        }
        return quiz;
    }

    async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
        try {
          let deletedQuestions = [], newQuestions = [];
          let updatedQuestions = [];
          const quiz = await this.quizModel.findById(id).exec();
          updatedQuestions = [...quiz.questions];
          if (!quiz) {
            throw new NotFoundException('Quiz not found');
          }
          if (updateQuizDto.questions && updateQuizDto.questions.length > 0) {
            deletedQuestions = this.getDeletedQuestions(
              objectIDToString(quiz.questions),
              objectIDToString(updateQuizDto.questions.map((q) => q._id))
            );
            newQuestions = this.getNewQuestions(updateQuizDto.questions);
          }
          if (deletedQuestions.length > 0) {
            await this.questionService.deleteBulk(deletedQuestions);
            updatedQuestions.filter((q) => !deletedQuestions.includes(q._id.toString()));
          }

          if (newQuestions.length > 0) {
            const newQuestionIds = await this.questionService.createBulk(newQuestions);
            updatedQuestions = [...updatedQuestions, ...newQuestionIds];
          }

          updateQuizDto.questions = updatedQuestions;
          const updatedQuiz = await this.quizModel.findByIdAndUpdate(id, updateQuizDto, { new: true }).exec();
          return updatedQuiz;
        } catch (e) {
          throw new InternalServerErrorException('Failed to update quiz');
        }
      }

    async delete(id: string): Promise<{ message: string }> {
        const quiz = await this.quizModel.findById(id).exec();
        if (!quiz) {
            throw new NotFoundException('Quiz not found');
        }
        await this.questionService.deleteBulk(objectIDToString(quiz.questions));
        await this.quizModel.findByIdAndDelete(id).exec();
        return { message: 'Quiz deleted successfully' };
    }
    getDeletedQuestions(quizQuestionsIds: string[], deletedQuestionsIds: string[]) {
        return quizQuestionsIds.filter((id) => !deletedQuestionsIds.includes(id));
    }

    getNewQuestions(updatedQuestions: IQuestion[]) {
        return updatedQuestions.filter((question) => !question._id);
    }


}
