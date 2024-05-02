import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { ExamModule } from 'src/exam/exam.module';

@Module({
  providers: [ResultsService],
  controllers: [ResultsController],
  exports: [ResultsService],
  imports: [CoursesModule, ExamModule],
})
export class ResultsModule {}
