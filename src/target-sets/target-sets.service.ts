import { Injectable } from '@nestjs/common';
import { CreateTargetSetDto } from './dto/create-target-set.dto';
import { UpdateTargetSetDto } from './dto/update-target-set.dto';

@Injectable()
export class TargetSetsService {
  create(createTargetSetDto: CreateTargetSetDto) {
    return 'This action adds a new targetSet';
  }

  findAll() {
    return `This action returns all targetSets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} targetSet`;
  }

  update(id: number, updateTargetSetDto: UpdateTargetSetDto) {
    return `This action updates a #${id} targetSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} targetSet`;
  }
}
