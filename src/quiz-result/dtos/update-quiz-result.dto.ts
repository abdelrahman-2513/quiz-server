import { IsBoolean, IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdateQuizResultDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    score: number;

    @IsBoolean()
    @IsOptional()
    passed: boolean;
  }