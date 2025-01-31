import { IsEmail, IsString } from "class-validator";
import { UniqueEmail } from "../validators/is-email-unique.validator";

export class CreateUserDto {
    @IsEmail()
    @UniqueEmail({ message: 'Email is already taken' })
    email: string;
    @IsString()

    name: string;
    
    @IsString()
    role: string;
    
    @IsString()
    password: string;
}