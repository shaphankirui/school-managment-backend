import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SubClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  classTeacher: number;

  @IsNumber()
  @IsOptional()
  classPrefect?: number;
  @IsNumber()
  @IsNotEmpty()
  classId: number;

  pictureUrl?: string;

  academicTermId?: number;
}
