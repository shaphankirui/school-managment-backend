import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { TeacherDto } from './teacher.dto';
import { TeachersService } from './teachers.service';
import { TeacherLoginDto } from './teacherLogin.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Post()
  async createTeacher(@Body() dto: TeacherDto) {
    return this.teacherService.createTeacher(dto);
  }

  @Get()
  async getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.teacherService.getTeacherById(numericId);
  }

  @Put(':id')
  async updateTeacher(@Param('id') id: string, @Body() dto: TeacherDto) {
    const numericId = parseInt(id, 10);
    return this.teacherService.updateTeacher(numericId, dto);
  }

  @Delete(':id')
  async deleteTeacher(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.teacherService.deleteTeacher(numericId);
  }

  @Post('signin')
  async signIn(@Body() dto: TeacherLoginDto) {
    return this.teacherService.signIn(dto);
  }

  @Get('profile/:token')
  async getTeacherProfile(@Param('token') token: string) {
    return this.teacherService.getTeacherByToken(token);
  }
}
