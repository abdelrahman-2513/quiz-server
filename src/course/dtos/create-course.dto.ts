import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    name: string;
  
    @IsString()
    teacher: string;
  
    @IsArray()
    @IsOptional()
    students?: string[];
  }
  
  