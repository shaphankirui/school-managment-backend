import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubClassDto } from './subClass.dto';
import { SubClassesService } from './sub-classes.service';

@Controller('sub-classes')
export class SubClassesController {
  constructor(private readonly classService: SubClassesService) {}

  @Post()
  async createClass(@Body() dto: SubClassDto) {
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
  async updateClass(@Param('id') id: string, @Body() dto: SubClassDto) {
    const numericId = parseInt(id, 10);
    return this.classService.updateClass(numericId, dto);
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.classService.deleteClass(numericId);
  }
}
