import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ParentDto } from './parent.dto';
import { ParentService } from './parent.service';

@Controller('parent')
export class ParentController {
    constructor(private readonly parentService: ParentService) {}

  @Post()
  async createParent(@Body() dto: ParentDto) {
    return this.parentService.createParent(dto);
  }

  @Get()
  async getAllParents() {
    return this.parentService.getAllParents();
  }

  @Get(':id')
  async getParentById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.parentService.getParentById(numericId);
  }

  @Put(':id')
  async updateParent(@Param('id') id: string, @Body() dto: ParentDto) {
    const numericId = parseInt(id, 10);
    return this.parentService.updateParent(numericId, dto);
  }

  @Delete(':id')
  async deleteParent(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.parentService.deleteParent(numericId);
  }
}
