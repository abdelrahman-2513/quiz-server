import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    teacher?: string;
  
    @IsOptional()
    @IsArray()
    students?: string[];
  }