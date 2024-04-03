import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseDto } from './courses.dto';

@Injectable()
export class CoursesService {
    constructor(private readonly prisma: PrismaService) {}

    async createCourse(dto: CourseDto) {
      const course = await this.prisma.course.create({ data: dto });
      return course;
    }
  
    async getAllCourses() {
      return this.prisma.course.findMany();
    }
  
    async getCourseById(id: number) {
      const course = await this.prisma.course.findUnique({ where: { id } });
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return course;
    }
  
    async updateCourse(id: number, dto: CourseDto) {
      const existingCourse = await this.prisma.course.findUnique({
        where: { id },
      });
      if (!existingCourse) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return this.prisma.course.update({ where: { id }, data: dto });
    }
  
    async deleteCourse(id: number) {
      const existingCourse = await this.prisma.course.findUnique({
        where: { id },
      });
      if (!existingCourse) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return this.prisma.course.delete({ where: { id } });
    }
}
