import { Types } from "mongoose";
import { User } from "src/user/schemas/user.schema";

export interface ICourse{
    _id: Types.ObjectId
    name: string
    teacher: Types.ObjectId
    students: Types.ObjectId[]
}