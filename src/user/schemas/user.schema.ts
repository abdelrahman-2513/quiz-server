import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { EUserRole } from "../enums/user.enum";
import * as bcrypt from 'bcrypt';
export type userDocument = HydratedDocument<User>;


@Schema({timestamps: true})
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: EUserRole.STUDENT ,type:"enum", enum: EUserRole }) 
    role: EUserRole;

    @Prop({ required: true })
    password: string; 
}


export const userSchema  = SchemaFactory.createForClass(User);

userSchema.pre<userDocument>('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });