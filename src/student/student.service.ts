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
  
    async updateStudent(id: number, dto: StudentDto) {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });
  
      if (!existingStudent) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
  
      return this.prisma.student.update({
        where: { id },
        data: dto,
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
