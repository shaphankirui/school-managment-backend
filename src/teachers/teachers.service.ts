import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeacherDto } from './teacher.dto';

@Injectable()
export class TeachersService {
    constructor(private readonly prisma: PrismaService) {}

    async createTeacher(dto: TeacherDto) {
      const teacher = await this.prisma.teacher.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          otherName: dto.otherName,
          email: dto.email,
          password: dto.password,
          gender: dto.gender,
        },
      });
  
      return teacher;
    }
  
    async getAllTeachers() {
      return this.prisma.teacher.findMany();
    }
    
  
    async getTeacherById(id: number) {
      const teacher = await this.prisma.teacher.findUnique({
        where: { id },
      });
  
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }
  
      return teacher;
    }
  
    async updateTeacher(id: number, dto: TeacherDto) {
      const existingTeacher = await this.prisma.teacher.findUnique({
        where: { id },
      });
  
      if (!existingTeacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }
  
      return this.prisma.teacher.update({
        where: { id },
        data: dto,
      });
    }
  
    async deleteTeacher(id: number) {
      const existingTeacher = await this.prisma.teacher.findUnique({
        where: { id },
      });
  
      if (!existingTeacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }
  
      return this.prisma.teacher.delete({
        where: { id },
      });
    }
}
