import { IsOptional, IsString } from "class-validator";

export class UpdateAnnouncementDto {
    @IsString()
    @IsOptional()
    title: string;
    @IsString()
    @IsOptional()
    description: string;
}