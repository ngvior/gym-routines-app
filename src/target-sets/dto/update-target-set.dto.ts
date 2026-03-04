import { PartialType } from '@nestjs/mapped-types';
import { CreateTargetSetDto } from './create-target-set.dto';

export class UpdateTargetSetDto extends PartialType(CreateTargetSetDto) {}
