import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AcademicTermService } from './academic-term.service';
import { AcademicTermDto } from './academicTerm.dto';

@Controller('academic-terms')
export class AcademicTermController {
    constructor(private readonly academicTermService: AcademicTermService) {}

    @Post()
    async createAcademicTerm(@Body() dto: AcademicTermDto) {
        return this.academicTermService.createAcademicTerm(dto);
    }

    @Get()
    async getAllAcademicTerms() {
        return this.academicTermService.getAllAcademicTerms();
    }

    @Get(':id')
    async getAcademicTermById(@Param('id') id: string) {
        const numericId = parseInt(id, 10);
        return this.academicTermService.getAcademicTermById(numericId);
    }

    @Put(':id')
    async updateAcademicTerm(@Param('id') id: string, @Body() dto: AcademicTermDto) {
        const numericId = parseInt(id, 10);
        return this.academicTermService.updateAcademicTerm(numericId, dto);
    }

    @Delete(':id')
    async deleteAcademicTerm(@Param('id') id: string) {
        const numericId = parseInt(id, 10);
        return this.academicTermService.deleteAcademicTerm(numericId);
    }
}
