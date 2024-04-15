// results.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultDto } from './result.dto';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async createResult(dto: ResultDto) {
    return this.prisma.score.create({
      data: {
        examId: dto.examId, // Include the examId from the dto
        studentId: dto.studentId, // Include the studentId from the dto
        score: dto.score, // Include the score from the dto
        // Include other fields as needed
      },
    });
  }
  
  

  async getAllResults() {
    return this.prisma.score.findMany();
  }

  async getResultById(id: number) {
    const result = await this.prisma.score.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }

  async updateResult(id: number, dto: ResultDto) {
    const existingResult = await this.getResultById(id);

    return this.prisma.score.update({
      where: { id },
      data: {
        // Assuming Result model has fields like examId, studentId, score, etc.
        ...dto,
      },
    });
  }

  async deleteResult(id: number) {
    const existingResult = await this.getResultById(id);
    return this.prisma.score.delete({ where: { id } });
  }
}
