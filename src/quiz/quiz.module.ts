import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { QuestionModule } from 'src/question/question.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    QuestionModule,
    CourseModule,
    MongooseModule.forFeature([
      {name: Quiz.name,
      schema: QuizSchema}
    ])
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
