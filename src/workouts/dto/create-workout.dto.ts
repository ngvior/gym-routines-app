import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateWorkoutDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  routineId: number;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsDateString()
  completedAt?: Date;
}
