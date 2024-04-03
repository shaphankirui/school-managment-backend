import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class StudentDto {


  @IsString()
  @IsNotEmpty()
  firstName: string;

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
  parentId: number;
}
