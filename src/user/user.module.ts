import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { IsEmailUnique } from 'src/user/validators/is-email-unique.validator';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema}])],
  controllers: [UserController],
  providers: [UserService,IsEmailUnique],
  exports:[UserService]
})
export class UserModule {}
