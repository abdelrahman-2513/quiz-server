import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema.dto';

@Module({
  imports:[MongooseModule.forFeature([{name: Course.name, schema: CourseSchema}])],
  providers: [CourseService],
  controllers: [CourseController],
  exports:[CourseService]
})
export class CourseModule {}
