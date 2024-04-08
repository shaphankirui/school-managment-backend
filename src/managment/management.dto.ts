import { IsString, IsOptional, IsEmail } from 'class-validator';

export class ManagementDto {
  @IsString()
  @IsOptional() // Mark as optional for sign-up
  firstName: string;

  @IsString()
  @IsOptional() // Mark as optional for sign-up
  lastName: string;

  @IsOptional()
  @IsString()
  otherName?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional() // Mark as optional for sign-up
  @IsString()
  role: string;
}
