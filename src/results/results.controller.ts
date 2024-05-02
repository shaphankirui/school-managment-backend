import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultDto } from './result.dto';
import { ExamService } from 'src/exam/exam.service';
import { CoursesService } from 'src/courses/courses.service';
import { Prisma } from '@prisma/client';

@Controller('results')
export class ResultsController {
  constructor(
    private readonly resultsService: ResultsService,
    private readonly examsService: ExamService,
    private readonly courseService: CoursesService,
  ) {}

  @Post()
  async createResult(@Body() dto: ResultDto) {
    return this.resultsService.createResult(dto);
  }

  @Get()
  async getAllResults() {
    const results = await this.resultsService.getAllResults();
    const resultsWithDetails = await Promise.all(
      results.map(async (result) => {
        const exam = await this.examsService.getExamById(result.examId);
        const course = await this.courseService.getCourseById(exam.courseId);
        const percentage = await this.resultsService.calculatePercentage(
          result.score,
          exam.outOf,
        );
        const gradeData = this.findGradeAndPoints(
          percentage,
          course.GradingSystem[0].gradeRanges as Prisma.JsonArray,
        );
        return {
          ...result,
          percentage,
          ...gradeData,
        };
      }),
    );
    return resultsWithDetails;
  }

  @Get(':id')
  async getResultById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.resultsService.getResultById(id);
    const exam = await this.examsService.getExamById(result.examId);
    const course = await this.courseService.getCourseById(exam.courseId);
    const percentage = await this.resultsService.calculatePercentage(
      result.score,
      exam.outOf,
    );
    const gradeData = this.findGradeAndPoints(
      percentage,
      course.GradingSystem[0].gradeRanges as Prisma.JsonArray,
    );
    return {
      ...result,
      percentage,
      ...gradeData,
    };
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
    const results = await this.resultsService.getResultsByExam(examId);
    const exam = await this.examsService.getExamById(examId);
    const course = await this.courseService.getCourseById(exam.courseId);

    // Calculate percentage and find corresponding grade for each result
    const resultsWithGrade = await Promise.all(
      results.map(async (result) => {
        const percentage = await this.resultsService.calculatePercentage(
          result.score,
          exam.outOf,
        );
        const gradeData = this.findGradeAndPoints(
          percentage,
          course.GradingSystem[0].gradeRanges as Prisma.JsonArray,
        );
        return { ...result, percentage, ...gradeData };
      }),
    );

    return resultsWithGrade;
  }

  private findGradeAndPoints(
    percentage: number,
    gradeRanges: Prisma.JsonArray,
  ): { grade: string; points: number } {
    const ranges = gradeRanges as {
      grade: string;
      range: { min: number; max: number };
      points: number;
    }[];

    for (const range of ranges) {
      if (percentage >= range.range.min && percentage <= range.range.max) {
        return { grade: range.grade, points: range.points };
      }
    }
    return { grade: 'N/A', points: 0 }; // Return 'N/A' if no grade found
  }

  @Get('student/:studentId')
  async getAllResultsForStudent(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    const results =
      await this.resultsService.getAllResultsForStudent(studentId);
    const examGrades = await Promise.all(
      results.map(async (result) => {
        const exam = await this.examsService.getExamById(result.examId);
        const course = await this.courseService.getCourseById(exam.courseId);
        const percentage = await this.resultsService.calculatePercentage(
          result.score,
          exam.outOf,
        );
        const gradeData = this.findGradeAndPoints(
          percentage,
          course.GradingSystem[0].gradeRanges as Prisma.JsonArray,
        );
        return { ...result, percentage, ...gradeData };
      }),
    );
    return examGrades;
  }
}
