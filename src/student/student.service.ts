import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignCourseDto, StudentDto } from './student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(dto: StudentDto) {
    const student = await this.prisma.student.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        otherName: dto.otherName,
        gender: dto.gender,
        classId: dto.classId,
        subClassId: dto.subClassId,
        emergencyContactNumber: dto.emergencyContactNumber,
        parentId: dto.parentId, // Corrected field
      },
    });

    return student;
  }

  async getAllStudents() {
    return this.prisma.student.findMany();
  }

  async getStudentById(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async updateStudent(id: string, dto: StudentDto) {
    const numericId = parseInt(id, 10);
    const existingStudent = await this.prisma.student.findUnique({
      where: { id: numericId },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${numericId} not found`);
    }

    return this.prisma.student.update({
      where: { id: numericId },
      data: dto,
    });
  }

  async getStudentsWithPositiveFeeBalance() {
    return this.prisma.student.findMany({
      where: {
        feeBalance: {
          gt: 0, // Filter students with fee balance greater than 0
        },
      },
    });
  }

  async getStudentsWithNonPositiveFeeBalance() {
    return this.prisma.student.findMany({
      where: {
        feeBalance: {
          lte: 0, // Filter students with fee balance less than or equal to 0
        },
      },
    });
  }

  async assignCourseToStudent(assignCourseDto: AssignCourseDto) {
    const { studentId, classCourseAssignments } = assignCourseDto;

    // Check if the student exists
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: {
        enrolledCourses: true,
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Process each class course assignment
    for (const assignment of classCourseAssignments) {
      const classCourseId = assignment.classCourseId;

      // Check if the class course exists
      const classCourse = await this.prisma.classCourse.findUnique({
        where: { id: classCourseId },
      });

      if (!classCourse) {
        throw new NotFoundException(
          `Class course with ID ${classCourseId} not found`,
        );
      }

      // Check if the student already enrolled in the class course
      const isEnrolled = student.enrolledCourses.some(
        (course) => course.classCourseId === classCourseId,
      );

      if (isEnrolled) {
        throw new Error(`Student is already enrolled in the class course`);
      }

      // Assign the class course to the student
      await this.prisma.studentCourse.create({
        data: {
          studentId,
          courseId: classCourse.courseId,
          classCourseId,
        },
      });
    }

    // Check if the student has at least 7 courses assigned
    if (student.enrolledCourses.length < 7) {
      throw new Error(`Student must be enrolled in at least 7 courses`);
    }

    // Check if the student is enrolled in all mandatory courses
    const mandatoryCourses = await this.prisma.course.findMany({
      where: { category: 'Mandatory' },
    });

    const enrolledMandatoryCourses = student.enrolledCourses.filter(
      (enrolledCourse) =>
        mandatoryCourses.some(
          (mandatoryCourse) => mandatoryCourse.id === enrolledCourse.courseId,
        ),
    );

    if (enrolledMandatoryCourses.length < mandatoryCourses.length) {
      throw new Error(`Student must be enrolled in all mandatory courses`);
    }

    // Check if the student is enrolled in at least 2 science courses
    const scienceCourses = await this.prisma.course.findMany({
      where: { category: 'Sciences' },
    });

    const enrolledScienceCourses = student.enrolledCourses.filter(
      (enrolledCourse) =>
        scienceCourses.some(
          (scienceCourse) => scienceCourse.id === enrolledCourse.courseId,
        ),
    );

    if (enrolledScienceCourses.length < 2) {
      throw new Error(`Student must be enrolled in at least 2 science courses`);
    }

    // Check if the student is enrolled in at least 2 courses from Humanities or Others category
    const nonScienceCourses = await this.prisma.course.findMany({
      where: {
        NOT: {
          category: 'Sciences',
        },
      },
    });

    const enrolledNonScienceCourses = student.enrolledCourses.filter(
      (enrolledCourse) =>
        nonScienceCourses.some(
          (nonScienceCourse) => nonScienceCourse.id === enrolledCourse.courseId,
        ),
    );

    if (enrolledNonScienceCourses.length < 2) {
      throw new Error(
        `Student must be enrolled in at least 2 courses from Humanities or Others category`,
      );
    }

    return { message: 'Courses assigned successfully' };
  }

  async deleteStudent(id: number) {
    const existingStudent = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return this.prisma.student.delete({
      where: { id },
    });
  }
}
