import { IsString, IsDateString } from 'class-validator';

export class AcademicTermDto {
    @IsString()
    name: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;
}
