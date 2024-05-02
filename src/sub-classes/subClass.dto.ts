import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SubClassDto {
 

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  classTeacher: number;

  @IsNumber()
  classPrefect?: number;
  @IsNumber()
  @IsNotEmpty()
  classId: number;

  pictureUrl?: string;

  academicTermId?: number;
}
