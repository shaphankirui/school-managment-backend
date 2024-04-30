import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseDto } from './courses.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post()
  async createCourse(@Body() dto: CourseDto) {
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
  async updateCourse(@Param('id') id: string, @Body() dto: CourseDto) {
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
}
