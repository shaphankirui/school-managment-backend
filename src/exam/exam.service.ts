import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExamDto } from './exam.dto';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async createExam(dto: ExamDto) {
    const parsedDate = new Date(dto.date);

    return this.prisma.exam.create({
      data: {
        name: dto.name,
        date: parsedDate, // Pass the Date object
        courseId: dto.courseId,
        teacherId: dto.teacherId,
        classId: dto.classId,
        accademicTermId: dto.accademicTermId,
        outOf: dto.out_of,
        passMark: dto.pass_mark,
      },
    });
  }

  async getAllExams() {
    return this.prisma.exam.findMany();
  }

  async getExamById(id: number) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }
    return exam;
  }

  async updateExam(id: number, dto: ExamDto) {
    const existingExam = await this.prisma.exam.findUnique({ where: { id } });
    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    const parsedDate = new Date(dto.date);

    return this.prisma.exam.update({
      where: { id },
      data: {
        name: dto.name,
        date: parsedDate, // Pass the Date object
        courseId: dto.courseId,
        teacherId: dto.teacherId,
        classId: dto.classId,
        accademicTermId: dto.accademicTermId,
        outOf: dto.out_of,
        passMark: dto.pass_mark,
      },
    });
  }

  async deleteExam(id: number) {
    const existingExam = await this.prisma.exam.findUnique({ where: { id } });
    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }
    return this.prisma.exam.delete({ where: { id } });
  }

  async getStudentsTakingExam(examId: number) {
    const exam = await this.getExamById(examId);
    const classStudents = await this.prisma.class.findUnique({
      where: { id: exam.classId },
      include: { students: true },
    });
    return classStudents.students;
  }
}
