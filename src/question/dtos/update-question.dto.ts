import { IsArray, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateQuestionDto {
    @IsString  ()
    @IsOptional()
    @MinLength(10) 
    questionText:string;
    @IsArray()
    @IsOptional()
    options: string[];
    
    @IsOptional()
        @IsString()
        answer: string;
}