import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ManagementDto } from './management.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ManagementService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async createManagement(dto: ManagementDto) {
    const hash = await argon.hash(dto.password);

    // Replace 'password' in dto with the generated hash
    const managementData = {
        ...dto,
        password: hash, // Replace 'password' field with the hash
    };

    return this.prisma.management.create({ data: managementData });
}

  async getAllManagement() {
    return this.prisma.management.findMany();
  }

  async getManagementById(id: number) {
    const management = await this.prisma.management.findUnique({ where: { id } });
    if (!management) {
      throw new NotFoundException(`Management with ID ${id} not found`);
    }
    return management;
  }

  async updateManagement(id: number, dto: ManagementDto) {
    const management = await this.getManagementById(id);
    return this.prisma.management.update({ where: { id }, data: dto });
  }

  async deleteManagement(id: number) {
    const management = await this.getManagementById(id);
    return this.prisma.management.delete({ where: { id } });
  }

  async signIn(dto: ManagementDto) {
    const management = await this.prisma.management.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!management) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const pwMatches = await argon.verify(management.password, dto.password);

    if (!pwMatches) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.signToken(management.id, management.email);
  }

  async signToken(managementId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: managementId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
