// results.controller.ts

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultDto } from './result.dto'; // Import DTO for creating and updating results

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  async createResult(@Body() dto: ResultDto) {
    return this.resultsService.createResult(dto);
  }

  @Get()
  async getAllResults() {
    return this.resultsService.getAllResults();
  }

  @Get(':id')
  async getResultById(@Param('id', ParseIntPipe) id: number) {
    return this.resultsService.getResultById(id);
  }

  @Patch(':id')
  async updateResult(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ResultDto,
  ) {
    return this.resultsService.updateResult(id, dto);
  }

  @Delete(':id')
  async deleteResult(@Param('id', ParseIntPipe) id: number) {
    return this.resultsService.deleteResult(id);
  }

  @Get('exam/:examId')
  async getResultsByExam(@Param('examId', ParseIntPipe) examId: number) {
    return this.resultsService.getResultsByExam(examId);
  }

  @Get('student/:studentId')
  async getAllResultsForStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.resultsService.getAllResultsForStudent(studentId);
  }
}

