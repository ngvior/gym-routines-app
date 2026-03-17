import { IsNotEmpty, IsInt, IsUUID, Min, Max } from 'class-validator';

export class CreateSplitScheduleDto {
  @IsUUID()
  @IsNotEmpty()
  splitId: string;

  @IsInt()
  @IsNotEmpty()
  routineId: number;

  @IsInt()
  @Min(0)
  @Max(6)
  dayIndex: number;
}
