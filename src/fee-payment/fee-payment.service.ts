import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeePaymentDto } from './FeePayment.dto';

@Injectable()
export class FeePaymentService {
    constructor(private readonly prisma: PrismaService) {}

    async createFeePayment(dto: FeePaymentDto) {
        const feePayment = await this.prisma.feePayment.create({
            data: {
                amount: dto.amount,
                paymentMode: dto.paymentMode,
                confirmationCode: dto.confirmationCode,
                createdAt: dto.createdAt,
                updatedAt: dto.updatedAt,
                studentId: dto.studentId,
            },
        });
        return feePayment;
    }

    async getAllFeePayments() {
        return this.prisma.feePayment.findMany();
    }

    async getFeePaymentById(id: number) {
        const feePayment = await this.prisma.feePayment.findUnique({
            where: { id },
        });
        if (!feePayment) {
            throw new NotFoundException(`Fee payment with ID ${id} not found`);
        }
        return feePayment;
    }

    async updateFeePayment(id: number, dto: FeePaymentDto) {
        const existingFeePayment = await this.prisma.feePayment.findUnique({
            where: { id },
        });
        if (!existingFeePayment) {
            throw new NotFoundException(`Fee payment with ID ${id} not found`);
        }
        return this.prisma.feePayment.update({
            where: { id },
            data: {
                amount: dto.amount,
                paymentMode: dto.paymentMode,
                confirmationCode: dto.confirmationCode,
                updatedAt: dto.updatedAt,
            },
        });
    }

    async deleteFeePayment(id: number) {
        const existingFeePayment = await this.prisma.feePayment.findUnique({
            where: { id },
        });
        if (!existingFeePayment) {
            throw new NotFoundException(`Fee payment with ID ${id} not found`);
        }
        return this.prisma.feePayment.delete({
            where: { id },
        });
    }
}
