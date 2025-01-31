import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateQuizResultDto {
    
    @IsString()
    quiz: string;
    @IsArray()
    answers: { questionId: string; selectedAnswer: string }[];
    @IsNumber()
    score: number;
    @IsNumber()
    passed: boolean;
  }
  
  