import { PartialType } from '@nestjs/swagger';
import { CreateSplitScheduleDto } from './create-split-schedule.dto';

export class UpdateSplitScheduleDto extends PartialType(
  CreateSplitScheduleDto,
) {}
