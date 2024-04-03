import { IsInt, IsNotEmpty } from 'class-validator';

export class TeacherCourseDto {
  @IsInt()
  @IsNotEmpty()
  teacherId: number;

  @IsInt()
  @IsNotEmpty()
  courseId: number;
}
