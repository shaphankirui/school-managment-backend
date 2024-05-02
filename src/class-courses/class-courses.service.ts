import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassCourseDto } from './classCourses.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassCoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(dto: ClassCourseDto) {
    const course = await this.prisma.classCourse.create({ data: dto });
    return course;
  }

  async getAllCourses() {
    return this.prisma.classCourse.findMany({
      include: { GradingSystem: true },
    });
  }

  async getCourseById(id: number) {
    const course = await this.prisma.classCourse.findUnique({
      where: { id },
      include: { GradingSystem: true }, // Include the associated grading system
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async updateCourse(id: number, dto: ClassCourseDto) {
    const existingCourse = await this.prisma.classCourse.findUnique({
      where: { id },
    });
    if (!existingCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return this.prisma.classCourse.update({ where: { id }, data: dto });
  }

  async deleteCourse(id: number) {
    const existingCourse = await this.prisma.classCourse.findUnique({
      where: { id },
    });
    if (!existingCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return this.prisma.classCourse.delete({ where: { id } });
  }

  async createGradingSystem(courseId: number, gradingSystem: any) {
    const course = await this.prisma.classCourse.findUnique({
      where: { id: courseId },
      include: { GradingSystem: true },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    let gradingSystemData;

    if (course.GradingSystem && course.GradingSystem.length > 0) {
      const existingGradingSystem = course.GradingSystem[0];
      gradingSystemData = await this.prisma.gradingSystem.update({
        where: { id: existingGradingSystem.id },
        data: { gradeRanges: gradingSystem },
      });
    } else {
      gradingSystemData = await this.prisma.gradingSystem.create({
        data: {
          courseId,
          gradeRanges: gradingSystem,
        },
      });
    }

    return gradingSystemData;
  }
}
