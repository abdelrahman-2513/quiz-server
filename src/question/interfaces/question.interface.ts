import { Types } from "mongoose";

export interface IQuestion {
    _id?:Types.ObjectId;
    questionText: string;
    answer: string;
    questionType: string;
    options: string[];
}