import { IsString, IsDateString, IsNumber } from 'class-validator';

export class AcademicTermDto {
  @IsString()
  name: string;
  @IsNumber()
  feeAmount: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
