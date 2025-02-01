import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/schemas/user.schema";

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacher: Types.ObjectId;

  @Prop({  type: [{type:Types.ObjectId, ref: 'User' }] ,ref:'User'})
  students: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);