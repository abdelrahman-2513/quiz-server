import { forwardRef, Module } from '@nestjs/common';
import { QuizResultController } from './quiz-result.controller';
import { QuizResultService } from './quiz-result.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizResult, QuizResultSchema } from './schemas/quiz-result.schema';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports:[forwardRef(()=>QuizModule),MongooseModule.forFeature([{ name: QuizResult.name, schema: QuizResultSchema }])],
  controllers: [QuizResultController],
  providers: [QuizResultService],
  exports:[QuizResultService]
})
export class QuizResultModule {}
