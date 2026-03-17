import { IsNotEmpty, IsString, IsNumber, IsInt, Min, IsDateString, IsUUID } from 'class-validator';

export class CreatePersonalRecordDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  exerciseName: string;

  @IsNumber()
  @Min(0)
  maxLoad: number;

  @IsInt()
  @Min(1)
  reps: number;

  @IsDateString()
  @IsNotEmpty()
  achievedAt: string;
}
