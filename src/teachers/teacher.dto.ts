import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsNumber,
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
  @IsNotEmpty()
  @IsNumber()
  salaryAmount: number;
  @IsNotEmpty()
  @IsNumber()
  salaryBalance: number;
  @IsNotEmpty()
  @IsNumber()
  RemidialBalance: number;
  @IsNotEmpty()
  @IsNumber()
  TotalBance: number;
  @IsNotEmpty()
  @IsString()
  bankName: string;
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
