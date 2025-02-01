import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { EQuizType } from '../enums/quiz.enum';

export type QuizDocument = HydratedDocument<Quiz>

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({type:[ Types.ObjectId], ref: 'Question'  })
  questions: Types.ObjectId[]; 

  @Prop({ required: true })
  duration: number; 

  @Prop({ required: true })
  passingScore: number; 

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ required: true ,type:Date })
  dueDate: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

QuizSchema.pre(/^find/, function (this: any, next) {
  this.populate('questions');
  next();
});