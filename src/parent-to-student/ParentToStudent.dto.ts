import { IsInt, IsNotEmpty } from 'class-validator';

export class ParentToStudentDto {
  @IsInt()
  @IsNotEmpty()
  parentId: number;

  @IsInt()
  @IsNotEmpty()
  studentId: number;
}
