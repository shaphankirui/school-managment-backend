import { Module } from '@nestjs/common';
import { ClassCoursesController } from './class-courses.controller';
import { ClassCoursesService } from './class-courses.service';

@Module({
  controllers: [ClassCoursesController],
  providers: [ClassCoursesService]
})
export class ClassCoursesModule {}
