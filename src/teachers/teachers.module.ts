import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TeachersService,JwtStrategy,AuthService],
  controllers: [TeachersController],
  imports: [JwtModule.register({})],

})
export class TeachersModule {}
