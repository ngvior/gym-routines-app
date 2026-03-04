import { IsNotEmpty, IsInt, IsNumber, Min } from 'class-validator';

export class CreateTargetSetDto {
  @IsInt()
  @IsNotEmpty()
  exerciseId: number;

  @IsInt()
  @Min(1)
  targetReps: number;

  @IsNumber()
  @Min(0)
  targetLoad: number;

  @IsInt()
  @Min(0)
  orderIndex: number;
}
