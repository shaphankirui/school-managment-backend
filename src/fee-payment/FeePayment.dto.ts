import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class FeePaymentDto {
    @IsNumber()
    amount: number;

    @IsString()
    paymentMode: string;

    @IsOptional()
    @IsString()
    confirmationCode?: string;

    @IsDateString()
    createdAt: Date;

    @IsDateString()
    updatedAt: Date;

    @IsNumber()
    studentId: number;
}
