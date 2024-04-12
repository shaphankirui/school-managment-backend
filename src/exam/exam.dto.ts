import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ExamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  date: string; // Change to string

  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  teacherId: number;

  @IsNumber()
  @IsNotEmpty()
  classId: number;

  @IsNumber()
  @IsNotEmpty()
  accademicTermId: number;

  @IsNumber()
  @IsNotEmpty()
  out_of: number;

  @IsNumber()
  @IsOptional()
  pass_mark?: number;
}