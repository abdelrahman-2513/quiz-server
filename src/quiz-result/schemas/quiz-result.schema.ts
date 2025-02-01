import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type QuizResultDocument = HydratedDocument<QuizResult>;

@Schema({ timestamps: true })
export class QuizResult {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Quiz', required: true })
  quiz: Types.ObjectId;

  @Prop({ type: [{ questionId: Types.ObjectId, selectedAnswer: String }] })
  answers: { questionId: Types.ObjectId; selectedAnswer: string }[];

  @Prop({ required: true })
  score: number;

  @Prop({ required: true, default: false })
  passed: boolean;
}

export const QuizResultSchema = SchemaFactory.createForClass(QuizResult);
