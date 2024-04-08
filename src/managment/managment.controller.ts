import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ManagementDto } from './management.dto';
import { ManagementService } from './managment.service';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Post()
  async createManagement(@Body() dto: ManagementDto) {
    return this.managementService.createManagement(dto);
  }

  @Get()
  async getAllManagement() {
    return this.managementService.getAllManagement();
  }

  @Get(':id')
  async getManagementById(@Param('id') id: string) {
    return this.managementService.getManagementById(+id);
  }

  @Put(':id')
  async updateManagement(@Param('id') id: string, @Body() dto: ManagementDto) {
    return this.managementService.updateManagement(+id, dto);
  }

  @Delete(':id')
  async deleteManagement(@Param('id') id: string) {
    return this.managementService.deleteManagement(+id);
  }
  @Post('signin')
  async signIn(@Body() dto: ManagementDto) {
    return this.managementService.signIn(dto);
  }
}
