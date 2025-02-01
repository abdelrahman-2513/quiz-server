import { IsArray, IsString, MinLength } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    @MinLength(10)
    questionText: string;
    
    @IsArray()
    options: string[];
    
    @IsString()
    answer: string;

    
}