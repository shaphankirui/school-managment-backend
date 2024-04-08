import { Module } from '@nestjs/common';
import { ManagementController } from './managment.controller';
import { ManagementService } from './managment.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';
import { AuthService } from 'src/auth/auth.service';


@Module({
  providers: [ManagementService,JwtStrategy,AuthService],
  controllers: [ManagementController],
  imports: [JwtModule.register({})],

})
export class ManagmentModule {}
