import { Module } from '@nestjs/common';
import { TeachersCoursesController } from './teachers-courses.controller';
import { TeachersCoursesService } from './teachers-courses.service';

@Module({
  controllers: [TeachersCoursesController],
  providers: [TeachersCoursesService]
})
export class TeachersCoursesModule {}
