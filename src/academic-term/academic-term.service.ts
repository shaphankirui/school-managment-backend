import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AcademicTermDto } from './academicTerm.dto';

@Injectable()
export class AcademicTermService {
    constructor(private readonly prisma: PrismaService) {}

    async createAcademicTerm(dto: AcademicTermDto) {
        return this.prisma.academicTerm.create({ data: dto });
    }

    async getAllAcademicTerms() {
        return this.prisma.academicTerm.findMany();
    }

    async getAcademicTermById(id: number) {
        const academicTerm = await this.prisma.academicTerm.findUnique({
            where: { id },
        });

        if (!academicTerm) {
            throw new NotFoundException(`Academic term with ID ${id} not found`);
        }

        return academicTerm;
    }

    async updateAcademicTerm(id: number, dto: AcademicTermDto) {
        const existingAcademicTerm = await this.prisma.academicTerm.findUnique({
            where: { id },
        });

        if (!existingAcademicTerm) {
            throw new NotFoundException(`Academic term with ID ${id} not found`);
        }

        return this.prisma.academicTerm.update({
            where: { id },
            data: dto,
        });
    }

    async deleteAcademicTerm(id: number) {
        const existingAcademicTerm = await this.prisma.academicTerm.findUnique({
            where: { id },
        });

        if (!existingAcademicTerm) {
            throw new NotFoundException(`Academic term with ID ${id} not found`);
        }

        return this.prisma.academicTerm.delete({
            where: { id },
        });
    }
}
