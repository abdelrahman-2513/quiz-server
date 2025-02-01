import { forwardRef, Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { QuestionModule } from 'src/question/question.module';
import { CourseModule } from 'src/course/course.module';
import { QuizResultModule } from 'src/quiz-result/quiz-result.module';

@Module({
  imports: [
    forwardRef(() => QuizResultModule),
    QuestionModule,
    CourseModule,
    MongooseModule.forFeature([
      {name: Quiz.name,
      schema: QuizSchema}
    ])
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService]
})
export class QuizModule {}
