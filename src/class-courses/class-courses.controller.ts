import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassCourseDto } from './classCourses.dto';
import { ClassCoursesService } from './class-courses.service';

@Controller('class-courses')
export class ClassCoursesController {
  constructor(private readonly courseService: ClassCoursesService) {}

  @Post()
  async createCourse(@Body() dto: ClassCourseDto) {
    return this.courseService.createCourse(dto);
  }

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(parseInt(id, 10));
  }

  @Put(':id')
  async updateCourse(@Param('id') id: string, @Body() dto: ClassCourseDto) {
    return this.courseService.updateCourse(parseInt(id, 10), dto);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(parseInt(id, 10));
  }

  // New endpoint to handle grading systems
  @Post(':id/grading-system')
  async createGradingSystem(
    @Param('id') id: string,
    @Body() gradingSystem: any,
  ) {
    return this.courseService.createGradingSystem(
      parseInt(id, 10),
      gradingSystem,
    );
  }
  @Post(':classId/link-students/:courseId')
  async linkStudentsToClassCourse(
    @Param('classId') classId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.courseService.linkStudentsToClassCourse(classId, courseId);
  }
}
