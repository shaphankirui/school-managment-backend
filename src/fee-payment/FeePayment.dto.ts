import {
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class FeePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  paymentMode: string;

  @IsOptional()
  @IsString()
  confirmationCode?: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @IsNumber()
  studentId: number;
}
