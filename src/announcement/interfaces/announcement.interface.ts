import { Types } from "mongoose";

export interface IAnnouncement {
    _id: Types.ObjectId;
    title: string;
    content: string;
    user: Types.ObjectId
}