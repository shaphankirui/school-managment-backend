import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { AssignCourseDto, StudentDto } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get('fee-positive')
  async getStudentsWithPositiveFeeBalance() {
    return this.studentService.getStudentsWithPositiveFeeBalance();
  }

  @Get('fee-non-positive')
  async getStudentsWithNonPositiveFeeBalance() {
    return this.studentService.getStudentsWithNonPositiveFeeBalance();
  }

  // @UseGuards(JwtGuard)
  @Post()
  async createStudent(@Body() dto: StudentDto) {
    return this.studentService.createStudent(dto);
  }
  @Post('assign-course')
  async assignCourseToStudent(@Body() assignCourseDto: AssignCourseDto) {
    return this.studentService.assignCourseToStudent(assignCourseDto);
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.studentService.getStudentById(numericId);
  }

  @Put(':id')
  async updateStudent(@Param('id') id: string, @Body() dto: StudentDto) {
    const numericId = parseInt(id, 10);
    return this.studentService.updateStudent(id, dto);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.studentService.deleteStudent(numericId);
  }
}
