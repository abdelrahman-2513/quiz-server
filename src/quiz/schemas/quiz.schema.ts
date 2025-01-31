import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { EQuizType } from '../enums/quiz.enum';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true ,default:EQuizType.EASY ,type:"enum", enum: EQuizType })
  type:EQuizType

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Types.ObjectId[]; 

  @Prop({ required: true })
  duration: number; 

  @Prop({ required: true })
  passingScore: number; 
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
