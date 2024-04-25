import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeePaymentDto } from './FeePayment.dto';

@Injectable()
export class FeePaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createFeePayment(dto: FeePaymentDto) {
    const feePayment = await this.prisma.$transaction(async (tx) => {
      const student = await tx.student.findUnique({
        where: { id: dto.studentId },
        select: { feeBalance: true },
      });

      if (!student) {
        throw new NotFoundException(
          `Student with ID ${dto.studentId} not found`,
        );
      }

      const newFeeBalance = student.feeBalance - dto.amount;

      const createdFeePayment = await tx.feePayment.create({
        data: {
          amount: dto.amount,
          paymentMode: dto.paymentMode,
          confirmationCode: dto.confirmationCode,
          createdAt: dto.createdAt,
          updatedAt: dto.updatedAt,
          studentId: dto.studentId,
        },
      });

      await tx.student.update({
        where: { id: dto.studentId },
        data: { feeBalance: newFeeBalance },
      });

      return createdFeePayment;
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
      select: { amount: true, studentId: true },
    });

    if (!existingFeePayment) {
      throw new NotFoundException(`Fee payment with ID ${id} not found`);
    }

    const student = await this.prisma.student.findUnique({
      where: { id: existingFeePayment.studentId },
      select: { feeBalance: true },
    });

    if (!student) {
      throw new NotFoundException(
        `Student with ID ${existingFeePayment.studentId} not found`,
      );
    }

    const newFeeBalance =
      student.feeBalance + existingFeePayment.amount - dto.amount;

    const updatedFeePayment = await this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.feePayment.update({
        where: { id },
        data: {
          amount: dto.amount,
          paymentMode: dto.paymentMode,
          confirmationCode: dto.confirmationCode,
          updatedAt: dto.updatedAt,
        },
      });

      await tx.student.update({
        where: { id: existingFeePayment.studentId },
        data: { feeBalance: newFeeBalance },
      });

      return updatedPayment;
    });

    return updatedFeePayment;
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
