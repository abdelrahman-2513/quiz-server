import { IsArray, IsEnum, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer"; 
import { EQuizType } from "../enums/quiz.enum";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";

export class CreateQuizDto {
    @IsString()
    title: string;

    @IsEnum(EQuizType)
    type: EQuizType; 

    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => CreateQuestionDto) 
    questions: CreateQuestionDto[];

    @IsNumber()
    @IsPositive()
    duration: number;

    @IsNumber()
    @IsPositive()
    passingScore: number;
}
