import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Quiz } from "./schemas/quiz.schema";
import { Model, Types } from "mongoose";
import { QuestionService } from "src/question/question.service";
import { CreateQuizDto, UpdateQuizDto } from "./dtos";
import { UpdateQuestionDto } from "src/question/dtos/update-question.dto";
import { IQuestion } from "src/question/interfaces/question.interface";
import { objectIDToString } from "src/common/transformers/objectID-to-string";
import { IQuiz } from "./interfaces/quiz.interface";
import { CourseService } from "src/course/course.service";

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    private readonly questionService: QuestionService,
    private readonly courseService: CourseService
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
    return this.quizModel.find().populate('course', 'name').populate('questions', 'questionText answer').exec();
  }

  async findOne(id: string): Promise<IQuiz> {
    const quiz = await this.quizModel.findById(id).populate(['questions', 'course']).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    try {
      let deletedQuestions = [], newQuestions = [];
      const quiz = await this.quizModel.findById(id).exec();
      if (!quiz) {
        throw new NotFoundException('Quiz not found');
      }
      let updatedQuestions = [...quiz.questions];
      
      if (updateQuizDto.questions && updateQuizDto.questions.length > 0) {
        deletedQuestions = this.getDeletedQuestions(
          objectIDToString(quiz.questions),
          objectIDToString(updateQuizDto.questions.filter((q) => q._id).map((q) => q._id))
        );
        newQuestions = this.getNewQuestions(updateQuizDto.questions);
      }
      
      if (deletedQuestions.length > 0) {
        await this.questionService.deleteBulk(deletedQuestions);
        updatedQuestions = updatedQuestions.filter((q) => !deletedQuestions.includes(q.toString()));
      }
      
      if (newQuestions.length > 0) {
        const newQuestionIds = await this.questionService.createBulk(newQuestions);
        updatedQuestions = [...updatedQuestions, ...newQuestionIds.map((id) =>new Types.ObjectId( id))];
      }
      
      
      return this.quizModel.findByIdAndUpdate(id, {...updateQuizDto,questions:updatedQuestions}, { new: true }).exec();
    } catch (e) {
      console.error(e);
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
    console.log(quizQuestionsIds, deletedQuestionsIds)
    return quizQuestionsIds.filter((id) => !deletedQuestionsIds.includes(id));
  }

  getNewQuestions(updatedQuestions: IQuestion[]) {
    console.log(updatedQuestions)
    return updatedQuestions.filter((question) => !question._id);
  }


  async getStudentQuizzes(studentId: string): Promise<any[]> {
    const courses = await this.courseService.getCoursesForStudent(studentId);
    
    console.log({courses});
    return this.quizModel.find({
      course: { $in: courses.map((c) => c.toString()) },
      dueDate: { $gte: new Date() }
    }).populate('course').exec();
  }

  async getTeacherQuizzes(teacherId: string): Promise<any[]> {
    const courses = await this.courseService.getCoursesForTeacher(teacherId);
    
    console.log({courses});
    return this.quizModel.find({
      course: { $in: courses.map((c) => c.toString()) },
      dueDate: { $gte: new Date() }
    }).populate('course').exec();
  }



}
