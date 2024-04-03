import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParentDto } from './parent.dto';

@Injectable()
export class ParentService {
    constructor(private readonly prisma: PrismaService) {}

  async createParent(dto: ParentDto) {
    const parent = await this.prisma.parent.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        otherName: dto.otherName,
        gender: dto.gender,
        email: dto.email,
        password: dto.password,
      },
    });

    return parent;
  }

  async getAllParents() {
    return this.prisma.parent.findMany();
  }

  async getParentById(id: number) {
    const parent = await this.prisma.parent.findUnique({
      where: { id },
    });

    if (!parent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }

    return parent;
  }

  async updateParent(id: number, dto: ParentDto) {
    const existingParent = await this.prisma.parent.findUnique({
      where: { id },
    });

    if (!existingParent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }

    return this.prisma.parent.update({
      where: { id },
      data: dto,
    });
  }

  async deleteParent(id: number) {
    const existingParent = await this.prisma.parent.findUnique({
      where: { id },
    });

    if (!existingParent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }

    return this.prisma.parent.delete({
      where: { id },
    });
  }
}
