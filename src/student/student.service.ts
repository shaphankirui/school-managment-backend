import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(dto: StudentDto) {
    const student = await this.prisma.student.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        otherName: dto.otherName,
        gender: dto.gender,
        classId: dto.classId,
        feeBalance: dto.classId,
        emergencyContactNumber: dto.emergencyContactNumber,
        parentId: dto.parentId, // Corrected field
      },
    });

    return student;
  }

  async getAllStudents() {
    return this.prisma.student.findMany();
  }

  async getStudentById(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async updateStudent(id: string, dto: StudentDto) {
    const numericId = parseInt(id, 10);
    const existingStudent = await this.prisma.student.findUnique({
      where: { id: numericId },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${numericId} not found`);
    }

    return this.prisma.student.update({
      where: { id: numericId },
      data: dto,
    });
  }

  async getStudentsWithPositiveFeeBalance() {
    return this.prisma.student.findMany({
      where: {
        feeBalance: {
          gt: 0, // Filter students with fee balance greater than 0
        },
      },
    });
  }

  async getStudentsWithNonPositiveFeeBalance() {
    return this.prisma.student.findMany({
      where: {
        feeBalance: {
          lte: 0, // Filter students with fee balance less than or equal to 0
        },
      },
    });
  }

  async deleteStudent(id: number) {
    const existingStudent = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return this.prisma.student.delete({
      where: { id },
    });
  }
}
