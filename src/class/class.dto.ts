import { IsString, IsNotEmpty } from 'class-validator';

export class ClassDto {
 

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  classTeacher: string;

  @IsString()
  classPrefect?: string;

  pictureUrl?: string;

  academicTermId?: number;
}
