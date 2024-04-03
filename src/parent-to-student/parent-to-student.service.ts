import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParentToStudentService {
  constructor(private readonly prisma: PrismaService) {}

  async getParentToStudentById(id: number) {
    // Custom query to fetch data from the _ParentToStudent table
    const parentToStudent = await this.prisma.$queryRaw`SELECT * FROM _ParentToStudent WHERE id = ${id}`;

    if (!parentToStudent) {
      throw new NotFoundException(`ParentToStudent with ID ${id} not found`);
    }

    return parentToStudent;
  }

  async deleteParentToStudent(id: number) {
    // Custom query to delete data from the _ParentToStudent table
    const deletedCount = await this.prisma.$executeRaw`DELETE FROM _ParentToStudent WHERE id = ${id}`;

    if (deletedCount === 0) {
      throw new NotFoundException(`ParentToStudent with ID ${id} not found`);
    }

    return { id };
  }
}
