import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { PrismaModule } from './prisma/prisma.module';

import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,

    StudentModule,

    ClassModule,

    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
