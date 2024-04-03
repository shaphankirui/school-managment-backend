import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TeacherCourseDto } from './TeachersCourses.dto';
import { TeachersCoursesService } from './teachers-courses.service';

@Controller('teachers-courses')
export class TeachersCoursesController {
 

    constructor(private readonly teacherCourseService: TeachersCoursesService) {}

    @Post()
    async createTeacherCourse(@Body() dto: TeacherCourseDto) {
      return this.teacherCourseService.createTeacherCourse(dto);
    }
  
    @Get()
    async getAllTeacherCourses() {
      return this.teacherCourseService.getAllTeacherCourses();
    }
  
    @Get(':id')
    async getTeacherCourseById( @Param('id') teacherId: string,
    @Param('courseId') courseId: string) {
        const numericTeacherId = parseInt(teacherId, 10);
        const numericCourseId = parseInt(courseId, 10);
        return this.teacherCourseService.getTeacherCourseById(numericTeacherId, numericCourseId);
    }
  
    @Delete(':id/:courseId')
    async deleteTeacherCourse(
      @Param('id') teacherId: string,
      @Param('courseId') courseId: string
    ) {
      const numericTeacherId = parseInt(teacherId, 10);
      const numericCourseId = parseInt(courseId, 10);
      return this.teacherCourseService.deleteTeacherCourse(numericTeacherId, numericCourseId);
    }
    
}
