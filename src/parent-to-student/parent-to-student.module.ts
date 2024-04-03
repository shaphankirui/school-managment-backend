import { Module } from '@nestjs/common';
import { ParentToStudentService } from './parent-to-student.service';
import { ParentToStudentController } from './parent-to-student.controller';

@Module({
  providers: [ParentToStudentService],
  controllers: [ParentToStudentController]
})
export class ParentToStudentModule {}
