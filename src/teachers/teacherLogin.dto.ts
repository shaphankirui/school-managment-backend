import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class TeacherLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

 
}
