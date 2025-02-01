import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizResultModule } from './quiz-result/quiz-result.module';
import { QuestionModule } from './question/question.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { getEnv } from './config.helper';

@Module({
  imports: [
    MongooseModule.forRoot(getEnv("DB_CONNECTION_STRING","mongodb+srv://abdo1234:Abdo-25132001@cluster0.krgi7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/quiz-app")),
    UserModule, QuizModule, QuizResultModule, QuestionModule, AnnouncementModule, AuthModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
