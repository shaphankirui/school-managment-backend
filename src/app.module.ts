import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { PrismaModule } from './prisma/prisma.module';

import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { CoursesModule } from './courses/courses.module';
import { TeachersModule } from './teachers/teachers.module';
import { TeachersCoursesModule } from './teachers-courses/teachers-courses.module';
import { ParentModule } from './parent/parent.module';
import { ParentToStudentModule } from './parent-to-student/parent-to-student.module';
import { AcademicTermModule } from './academic-term/academic-term.module';
import { FeePaymentModule } from './fee-payment/fee-payment.module';
import { ManagmentModule } from './managment/managment.module';
import { ExamModule } from './exam/exam.module';

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

    TeachersModule,

    TeachersCoursesModule,

    ParentModule,

    ParentToStudentModule,

    AcademicTermModule,

    FeePaymentModule,

    ManagmentModule,

    ExamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
