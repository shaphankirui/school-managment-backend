// exam-result.dto.ts

import { IsNotEmpty, IsNumber } from "class-validator";

export class ResultDto {
    @IsNumber()
    @IsNotEmpty()
    studentId: number;
    @IsNumber()
    @IsNotEmpty()
    score: number;
    @IsNumber()
    @IsNotEmpty()
    examId: number;
    // You can add more fields here as needed
  }
  