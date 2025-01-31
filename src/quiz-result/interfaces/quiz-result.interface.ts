import { Types } from "mongoose";

export interface IQuizResult {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    quiz: Types.ObjectId;
    answers: { questionId: Types.ObjectId; selectedAnswer: string }[];
    score: number;
    passed: boolean;
  }