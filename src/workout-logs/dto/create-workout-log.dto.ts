import { IsNotEmpty, IsInt, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateWorkoutLogDto {
  @IsInt()
  @IsNotEmpty()
  workoutId: number;

  @IsInt()
  @IsNotEmpty()
  exerciseId: number;

  @IsInt()
  @Min(0)
  actualReps: number;

  @IsNumber()
  @Min(0)
  actualLoad: number;

  @IsNumber()
  @IsOptional()
  targetLoadSnapshot?: number;
  
  @IsInt()
  @Min(1)
  setNumber: number;
}
