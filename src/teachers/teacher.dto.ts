import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class TeacherDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  otherName?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsBoolean()
  is_bom: boolean;
  @IsOptional()
  @IsNumber()
  salaryAmount: number;
  @IsOptional()
  @IsNumber()
  salaryBalance: number;
  @IsOptional()
  @IsNumber()
  RemidialBalance: number;
  @IsOptional()
  @IsNumber()
  TotalBance: number;
  @IsOptional()
  @IsString()
  bankName: string;
  @IsOptional()
  @IsString()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
