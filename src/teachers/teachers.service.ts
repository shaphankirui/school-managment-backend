import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeacherDto } from './teacher.dto';
import { TeacherLoginDto } from './teacherLogin.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async createTeacher(dto: TeacherDto) {
    const hash = await argon.hash(dto.password);
    const teacher = await this.prisma.teacher.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        otherName: dto.otherName,
        email: dto.email,
        password: hash,
        gender: dto.gender,
      },
    });

    return teacher;
  }

  async getAllTeachers() {
    return this.prisma.teacher.findMany();
  }

  async getTeacherById(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return teacher;
  }

  async updateTeacher(id: number, dto: TeacherDto) {
    const existingTeacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return this.prisma.teacher.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTeacher(id: number) {
    const existingTeacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return this.prisma.teacher.delete({
      where: { id },
    });
  }

  async signIn(dto: TeacherLoginDto) {
    const management = await this.prisma.teacher.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!management) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const pwMatches = await argon.verify(management.password, dto.password);

    if (!pwMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(management.id, management.email);
  }

  async signToken(
    managementId: number,
    email: string,
  ): Promise<{ access_token: string }> {
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

  async getTeacherByToken(token: string) {
    console.log('Received Token', token);
    // Decode token to extract payload
    const decodedToken: any = this.jwt.decode(token);
    // Log the decoded token
    console.log('Decoded Token', decodedToken);
    // Extract teacher ID from decoded token and convert it to a number
    const teacherId = parseInt(decodedToken.sub, 10);
    // Log the extracted teacher ID
    console.log('Teacher ID', teacherId);
    // Fetch teacher details using the extracted ID
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }
    return teacher;
  }
}
