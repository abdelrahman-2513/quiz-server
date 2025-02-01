import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuizResultDto {
    
    @IsString()
    quiz: string;
    @IsArray()
    answers: { questionId: string; selectedAnswer: string }[];
    @IsNumber()
    @IsOptional()
    score: number;
    @IsBoolean()
    @IsOptional()
    passed: boolean
    @IsString()
    @IsOptional()
    user: string
  }
  
  