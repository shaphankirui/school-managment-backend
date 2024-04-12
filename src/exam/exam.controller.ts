// exam.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamDto } from './exam.dto';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  async createExam(@Body() dto: ExamDto) {
    return this.examService.createExam(dto);
  }

  @Get()
  async getAllExams() {
    return this.examService.getAllExams();
  }

  @Get(':id')
  async getExamById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.examService.getExamById(numericId);
  }

  @Put(':id')
  async updateExam(@Param('id') id: string, @Body() dto: ExamDto) {
    const numericId = parseInt(id, 10);
    return this.examService.updateExam(numericId, dto);
  }

  @Delete(':id')
  async deleteExam(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.examService.deleteExam(numericId);
  }
}
