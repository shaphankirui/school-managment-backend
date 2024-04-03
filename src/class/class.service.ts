import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClassDto } from './class.dto';

@Injectable()
export class ClassService {
    constructor(private readonly prisma: PrismaService) {}

    async createClass(dto: ClassDto) {
      const classEntity = await this.prisma.class.create({
        data: {
          name: dto.name,
          classTeacher: dto.classTeacher,
          classPrefect: dto.classPrefect,
          pictureUrl: dto.pictureUrl,
          academicTermId: dto.academicTermId,
        },
      });
  
      return classEntity;
    }
  
    async getAllClasses() {
      return this.prisma.class.findMany();
    }
    
  
    async getClassById(id: number) {
      const classEntity = await this.prisma.class.findUnique({
        where: { id },
      });
  
      if (!classEntity) {
        throw new NotFoundException(`Class with ID ${id} not found`);
      }
  
      return classEntity;
    }
  
    async updateClass(id: number, dto: ClassDto) {
      const existingClass = await this.prisma.class.findUnique({
        where: { id },
      });
  
      if (!existingClass) {
        throw new NotFoundException(`Class with ID ${id} not found`);
      }
  
      return this.prisma.class.update({
        where: { id },
        data: dto,
      });
    }
  
    async deleteClass(id: number) {
      const existingClass = await this.prisma.class.findUnique({
        where: { id },
      });
  
      if (!existingClass) {
        throw new NotFoundException(`Class with ID ${id} not found`);
      }
  
      return this.prisma.class.delete({
        where: { id },
      });
    }
}
