import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeacherCourseDto } from './TeachersCourses.dto';

@Injectable()
export class TeachersCoursesService {
    constructor(private readonly prisma: PrismaService) {}

    async createTeacherCourse(dto: TeacherCourseDto) {
      const teacherCourse = await this.prisma.teacherCourse.create({
        data: {
          teacherId: dto.teacherId,
          courseId: dto.courseId,
        },
      });
  
      return teacherCourse;
    }
  
    async getAllTeacherCourses() {
      return this.prisma.teacherCourse.findMany();
    }
    
  
    async getTeacherCourseById(teacherId: number, courseId: number) {
        const teacherCourse = await this.prisma.teacherCourse.findUnique({
          where: { teacherId_courseId: { teacherId, courseId } }, // Assuming composite primary key
        });
      
        if (!teacherCourse) {
          throw new NotFoundException(`Teacher course with teacher ID ${teacherId} and course ID ${courseId} not found`);
        }
      
        return teacherCourse;
      }
      
      async deleteTeacherCourse(teacherId: number, courseId: number) {
        const existingTeacherCourse = await this.prisma.teacherCourse.findUnique({
          where: { teacherId_courseId: { teacherId, courseId } }, // Assuming composite primary key
        });
      
        if (!existingTeacherCourse) {
          throw new NotFoundException(`Teacher course with teacher ID ${teacherId} and course ID ${courseId} not found`);
        }
      
        return this.prisma.teacherCourse.delete({
          where: { teacherId_courseId: { teacherId, courseId } }, // Assuming composite primary key
        });
      }
      

}
