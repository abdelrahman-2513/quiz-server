import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { Request, Response } from 'express';
import { UpdateAnnouncementDto } from './dtos/update-anouncement.dto';

@Controller('announcement')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Res() res: Response,@Req() req:Request) {
    const announcement = await this.announcementService.create(createAnnouncementDto,req);
    return res.status(HttpStatus.CREATED).json({ message: 'Announcement created successfully', announcement });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const announcements = await this.announcementService.findAll();
    return res.status(HttpStatus.OK).json({ message: 'Announcements retrieved successfully', announcements });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const announcement = await this.announcementService.findOne(id);
    return res.status(HttpStatus.OK).json({ message: 'Announcement retrieved successfully', announcement });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto, @Res() res: Response) {
    const updatedAnnouncement = await this.announcementService.update(id, updateAnnouncementDto);
    return res.status(HttpStatus.OK).json({ message: 'Announcement updated successfully', updatedAnnouncement });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.announcementService.delete(id);
    return res.status(HttpStatus.OK).json(result);
  }
}
