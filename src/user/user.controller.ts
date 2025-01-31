import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ message: 'User created successfully', user });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOneById(id);
    return res.status(HttpStatus.OK).json({ message: 'User retrieved successfully', user });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json({ message: 'User updated successfully', updatedUser });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.userService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'User deleted successfully' });
  }
}
