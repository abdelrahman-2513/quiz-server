import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Announcement } from './schemas/announcement.schema';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { IAnnouncement } from './interfaces/announcement.interface';
import { UpdateAnnouncementDto } from './dtos/update-anouncement.dto';

@Injectable()
export class AnnouncementService {
    constructor(@InjectModel(Announcement.name) private readonly announcementModel: Model<Announcement>) {}

    async create(createAnnouncementDto: CreateAnnouncementDto): Promise<IAnnouncement> {
      const createdAnnouncement = new this.announcementModel(createAnnouncementDto);
      return createdAnnouncement.save();
    }
  
    async findAll(): Promise<IAnnouncement[]> {
      return this.announcementModel.find().exec();
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
