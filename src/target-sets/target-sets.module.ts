import { Module } from '@nestjs/common';
import { TargetSetsService } from './target-sets.service';
import { TargetSetsController } from './target-sets.controller';

@Module({
  controllers: [TargetSetsController],
  providers: [TargetSetsService],
})
export class TargetSetsModule {}
