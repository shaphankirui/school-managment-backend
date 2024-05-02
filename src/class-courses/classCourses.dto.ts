import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class ClassCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  courseId: number;
  @IsNumber()
  @IsNotEmpty()
  classId: number;

  //   @IsString()
  //   @IsOptional()
  //   description: string;
}
