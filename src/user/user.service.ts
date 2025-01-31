import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor( @InjectModel(User.name) private userModel:Model<User>){}


    async create(user:CreateUserDto):Promise<IUser>{
        try{

            const createdUser = new this.userModel(user);
            return await createdUser.save();
        }catch(e){
            throw new InternalServerErrorException("Try Again Later")
        }
    }

    async findOneByEmail(email:string):Promise<IUser>{
        return await this.userModel.findOne({email}).exec();
    }

    async findOneById(id:string):Promise<User>{
        return await this.userModel.findById(id).exec();
    }

    async update(id:string,updatedUser:UpdateUserDto):Promise<IUser>{

       try{ const user = await this.findOneById(id);
        if(!user){
            throw new NotFoundException('User not found');
        }

        return await this.userModel.findByIdAndUpdate(id,updatedUser,{new:true}).exec();}
        catch(e){
            throw new InternalServerErrorException("Try Again Later")
        }

    }
    async delete(id:string):Promise<string>{
        try{
            const user = await this.findOneById(id);
            if(!user){
                throw new NotFoundException('User not found');
            }
            await this.userModel.findByIdAndDelete(id).exec();
            return 'User deleted successfully';
        }catch(e){
            throw new InternalServerErrorException("Try Again Later")
        }
  
    }

}
