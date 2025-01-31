import {
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { EQuizType } from "../enums/quiz.enum";
import { UpdateQuestionDto } from "src/question/dtos/update-question.dto";
import { IQuestion } from "src/question/interfaces/question.interface";

export class UpdateQuizDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsEnum(EQuizType)
    type?: EQuizType;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateQuestionDto)
    questions?: IQuestion[];

    @IsOptional()
    @IsNumber()
    @IsPositive()
    duration?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    passingScore?: number;
}
