import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassDto } from './class.dto';

@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Post()
    async createClass(@Body() dto: ClassDto) {
      return this.classService.createClass(dto);
    }
  
    @Get()
    async getAllClasses() {
      return this.classService.getAllClasses();
    }
  
    @Get(':id')
    async getClassById(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.classService.getClassById(numericId);
    }
  
    @Put(':id')
    async updateClass(@Param('id') id: string, @Body() dto: ClassDto) {
      const numericId = parseInt(id, 10);
      return this.classService.updateClass(numericId, dto);
    }
  
    @Delete(':id')
    async deleteClass(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.classService.deleteClass(numericId);
    }
}
