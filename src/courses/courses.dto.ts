import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

//   @IsString()
//   @IsOptional()
//   description: string;
}
