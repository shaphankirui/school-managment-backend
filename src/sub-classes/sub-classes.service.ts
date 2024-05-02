import { Injectable, NotFoundException } from '@nestjs/common';
import { SubClassDto } from './subClass.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async createClass(dto: SubClassDto) {
    const classEntity = await this.prisma.subClass.create({
      data: {
        name: dto.name,
        classTeacher: dto.classTeacher,
        classPrefect: dto.classPrefect,
        classId: dto.classId,
        pictureUrl: dto.pictureUrl,
        academicTermId: dto.academicTermId,
      },
    });

    return classEntity;
  }

  async getAllClasses() {
    return this.prisma.subClass.findMany();
  }

  async getClassById(id: number) {
    const classEntity = await this.prisma.subClass.findUnique({
      where: { id },
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    return classEntity;
  }

  async updateClass(id: number, dto: SubClassDto) {
    const existingClass = await this.prisma.subClass.findUnique({
      where: { id },
    });

    if (!existingClass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    return this.prisma.subClass.update({
      where: { id },
      data: dto,
    });
  }

  async deleteClass(id: number) {
    const existingClass = await this.prisma.subClass.findUnique({
      where: { id },
    });

    if (!existingClass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    return this.prisma.subClass.delete({
      where: { id },
    });
  }
}
