import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Announcement } from './schemas/announcement.schema';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { IAnnouncement } from './interfaces/announcement.interface';
import { UpdateAnnouncementDto } from './dtos/update-anouncement.dto';
import { Request } from 'express';
import { ATPayload } from 'src/auth/types/access-token-payload.type';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class AnnouncementService {
  constructor(@InjectModel(Announcement.name) private readonly announcementModel: Model<Announcement>, private readonly courseService: CourseService) { }

  async create(createAnnouncementDto: CreateAnnouncementDto, req: Request): Promise<IAnnouncement> {
    const user = req["user"] as ATPayload;
    const createdAnnouncement = new this.announcementModel({ ...createAnnouncementDto, user: user.sub });
    return createdAnnouncement.save();
  }

  async findAll(req: Request): Promise<IAnnouncement[]> {
      const announcements = await this.announcementModel.find().populate('user').exec();
  
    return announcements
  }

  async findOne(id: string): Promise<IAnnouncement> {
    const announcement = await this.announcementModel.findById(id).exec();
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return announcement;
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto): Promise<IAnnouncement> {
    const updatedAnnouncement = await this.announcementModel.findByIdAndUpdate(id, updateAnnouncementDto, { new: true }).exec();
    if (!updatedAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }
    return updatedAnnouncement;
  }

  async delete(id: string): Promise<{ message: string }> {
    const announcement = await this.announcementModel.findByIdAndDelete(id).exec();
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return { message: 'Announcement deleted successfully' };
  }
}
