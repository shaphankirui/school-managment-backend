import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AcademicTermDto } from './academicTerm.dto';

@Injectable()
export class AcademicTermService {
  constructor(private readonly prisma: PrismaService) {}

  async createAcademicTerm(dto: AcademicTermDto) {
    const academicTerm = await this.prisma.academicTerm.create({
      data: dto,
    });

    // Update the feeBalance of all students
    await this.prisma.student.updateMany({
      data: {
        feeBalance: {
          increment: dto.feeAmount,
        },
      },
      where: {
        feeBalance: {
          not: null,
        },
      },
    });

    return academicTerm;
  }

  async getAllAcademicTerms() {
    return this.prisma.academicTerm.findMany();
  }

  async getAcademicTermById(id: number) {
    const academicTerm = await this.prisma.academicTerm.findUnique({
      where: { id },
    });

    if (!academicTerm) {
      throw new NotFoundException(`Academic term with ID ${id} not found`);
    }

    return academicTerm;
  }

  async updateAcademicTerm(id: number, dto: AcademicTermDto) {
    const existingAcademicTerm = await this.prisma.academicTerm.findUnique({
      where: { id },
    });

    if (!existingAcademicTerm) {
      throw new NotFoundException(`Academic term with ID ${id} not found`);
    }

    return this.prisma.academicTerm.update({
      where: { id },
      data: dto,
    });
  }

  async deleteAcademicTerm(id: number) {
    const existingAcademicTerm = await this.prisma.academicTerm.findUnique({
      where: { id },
    });

    if (!existingAcademicTerm) {
      throw new NotFoundException(`Academic term with ID ${id} not found`);
    }

    return this.prisma.academicTerm.delete({
      where: { id },
    });
  }
  async endAcademicTerm(id: number) {
    const numericId = +id; // Convert to number using the + operator

    const academicTerm = await this.prisma.academicTerm.findUnique({
      where: { id: numericId },
    });

    if (!academicTerm) {
      throw new NotFoundException(`Academic term with ID ${id} not found`);
    }

    if (!academicTerm.is_open) {
      throw new Error(`Academic term with ID ${id} is already closed`);
    }

    const students = await this.prisma.student.findMany({
      where: {
        feeBalance: {
          gt: 0,
        },
      },
      select: {
        id: true,
        feeBalance: true,
      },
    });

    const feeBalanceRecords = students.map((student) => ({
      studentId: student.id,
      feeBalance: student.feeBalance,
      academicTermId: numericId,
    }));

    const totalFeeBalance = feeBalanceRecords.reduce(
      (sum, record) => sum + record.feeBalance,
      0,
    );

    await this.prisma.$transaction([
      this.prisma.academicTerm.update({
        where: { id: numericId },
        data: { is_open: false },
      }),
      this.prisma.feeBalanceRecord.createMany({
        data: feeBalanceRecords,
      }),
    ]);

    return {
      feeBalanceRecords,
      totalFeeBalance,
    };
  }
}
