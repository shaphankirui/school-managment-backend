import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsNumber()
  @IsOptional()
  admisionNumber: number;
  @IsString()
  @IsNotEmpty()
  emergencyContactNumber: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  otherName?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  classId: number;
  @IsNotEmpty()
  subClassId: number;
  @IsNotEmpty()
  parentId: number;
}
