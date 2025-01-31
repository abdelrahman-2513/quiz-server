import { IsArray, IsString, MinLength } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    @MinLength(20)
    questionText: string;
    
    @IsArray()
    options: string[];
    
    @IsString()
    answer: string;

    
}