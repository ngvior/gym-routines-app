import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TargetSetsService } from './target-sets.service';
import { CreateTargetSetDto } from './dto/create-target-set.dto';
import { UpdateTargetSetDto } from './dto/update-target-set.dto';

@Controller('target-sets')
export class TargetSetsController {
  constructor(private readonly targetSetsService: TargetSetsService) {}

  @Post()
  create(@Body() createTargetSetDto: CreateTargetSetDto) {
    return this.targetSetsService.create(createTargetSetDto);
  }

  @Get()
  findAll() {
    return this.targetSetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.targetSetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTargetSetDto: UpdateTargetSetDto,
  ) {
    return this.targetSetsService.update(+id, updateTargetSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.targetSetsService.remove(+id);
  }
}
