import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Announcement, AnnouncementSchema } from './schemas/announcement.schema';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports:[CourseModule,MongooseModule.forFeature([{ name: Announcement.name, schema: AnnouncementSchema }])],
  controllers: [AnnouncementController],
  providers: [AnnouncementService]
})
export class AnnouncementModule {}
