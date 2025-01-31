import { Types } from "mongoose"
import { EQuizType } from "../enums/quiz.enum"
import { IQuestion } from "src/question/interfaces/question.interface"

export interface IQuiz {
    _id: Types.ObjectId,
    title: string,
    type: EQuizType,
    questions: Types.ObjectId[],
    duration: number,
    passingScore: number,
    course: Types.ObjectId,
    dueDate: Date,
}