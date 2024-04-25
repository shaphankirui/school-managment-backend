import { IsString, IsDateString, IsNumber, IsBoolean } from 'class-validator';

export class AcademicTermDto {
  @IsString()
  name: string;
  @IsNumber()
  feeAmount: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
  @IsBoolean()
  is_open: boolean;
}
