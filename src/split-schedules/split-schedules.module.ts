import { Module } from '@nestjs/common';
import { SplitSchedulesController } from './split-schedules.controller';
import { SplitSchedulesService } from './split-schedules.service';

@Module({
  controllers: [SplitSchedulesController],
  providers: [SplitSchedulesService]
})
export class SplitSchedulesModule {}
