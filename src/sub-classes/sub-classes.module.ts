import { Module } from '@nestjs/common';
import { SubClassesService } from './sub-classes.service';
import { SubClassesController } from './sub-classes.controller';

@Module({
  providers: [SubClassesService],
  controllers: [SubClassesController]
})
export class SubClassesModule {}
