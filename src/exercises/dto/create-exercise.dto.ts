import { IsNotEmpty, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import { MuscleGroup } from '../entities/exercise.entity';

export class CreateExerciseDto {
  @IsInt()
  @IsNotEmpty()
  routineId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MuscleGroup)
  @IsNotEmpty()
  muscleGroup: MuscleGroup;

  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;
}
