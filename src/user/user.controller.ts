import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Public, Roles } from 'src/auth/decorators';
import { EUserRole } from './enums/user.enum';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(EUserRole.ADMIN, EUserRole.TEACHER)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ message: 'User created successfully', user });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json({ message: 'Users retrieved successfully', users });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOneById(id);
    return res.status(HttpStatus.OK).json({ message: 'User retrieved successfully', user });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json({ message: 'User updated successfully', updatedUser });
  }

  @Roles(EUserRole.ADMIN)
  @Delete(':id')
 
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.userService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'User deleted successfully' });
  }
}
