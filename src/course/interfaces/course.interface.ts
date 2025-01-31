import { Types } from "mongoose";

export interface ICourse{
    _id: Types.ObjectId
    name: string
    teacher: Types.ObjectId
    students: Types.ObjectId[]
}