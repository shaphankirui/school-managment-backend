import { Module } from '@nestjs/common';
import { AcademicTermService } from './academic-term.service';
import { AcademicTermController } from './academic-term.controller';

@Module({
  providers: [AcademicTermService],
  controllers: [AcademicTermController]
})
export class AcademicTermModule {}
