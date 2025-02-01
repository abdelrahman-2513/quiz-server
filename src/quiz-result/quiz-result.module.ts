import { Module } from '@nestjs/common';
import { QuizResultController } from './quiz-result.controller';
import { QuizResultService } from './quiz-result.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizResult, QuizResultSchema } from './schemas/quiz-result.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: QuizResult.name, schema: QuizResultSchema }])],
  controllers: [QuizResultController],
  providers: [QuizResultService]
})
export class QuizResultModule {}
