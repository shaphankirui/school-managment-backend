import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ParentToStudentService } from './parent-to-student.service';

@Controller('parent-to-student')
export class ParentToStudentController {
  constructor(private readonly parentToStudentService: ParentToStudentService) {}

  @Get(':id')
  async getParentToStudentById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.parentToStudentService.getParentToStudentById(numericId);
  }

  @Delete(':id')
  async deleteParentToStudent(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.parentToStudentService.deleteParentToStudent(numericId);
  }
}
