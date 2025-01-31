import { Types } from "mongoose";
import { EUserRole } from "../enums/user.enum";

export interface IUser{
    _id: Types.ObjectId,
    email: string,
    name: string,
    role: EUserRole,
    password: string
}