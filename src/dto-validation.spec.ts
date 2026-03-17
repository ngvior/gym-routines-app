import { validate } from 'class-validator';
import { CreatePersonalRecordDto } from './personal-records/dto/create-personal-record.dto';
import { CreateTargetSetDto } from './target-sets/dto/create-target-set.dto';
import { CreateWorkoutLogDto } from './workout-logs/dto/create-workout-log.dto';
import { CreateExerciseDto } from './exercises/dto/create-exercise.dto';
import { CreateSplitScheduleDto } from './split-schedules/dto/create-split-schedule.dto';
import { CreateWorkoutDto } from './workouts/dto/create-workout.dto';
import { CreateSplitDto } from './splits/dto/create-split.dto';
import { CreateRoutineDto } from './routines/dto/create-routine.dto';

describe('DTO Validations', () => {
  it('should reject negative value for PRs maxLoad', async () => {
    const dto = new CreatePersonalRecordDto();
    dto.userId = 'uuid';
    dto.exerciseName = 'Squat';
    dto.maxLoad = -10;
    dto.reps = 1;
    dto.achievedAt = new Date().toISOString();
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'maxLoad')).toBe(true);
  });

  it('should reject negative value for TargetSets targetLoad', async () => {
    const dto = new CreateTargetSetDto();
    dto.exerciseId = 1;
    dto.targetReps = 10;
    dto.targetLoad = -5;
    dto.orderIndex = 0;
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'targetLoad')).toBe(true);
  });

  it('should reject negative value for WorkoutLogs actualLoad', async () => {
    const dto = new CreateWorkoutLogDto();
    dto.workoutId = 1;
    dto.exerciseId = 1;
    dto.actualReps = 10;
    dto.actualLoad = -5;
    dto.setNumber = 1;
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'actualLoad')).toBe(true);
  });

  it('should reject missing fields in Exercise', async () => {
    const dto = new CreateExerciseDto();
    // Intentionally missing routineId, name, etc.
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'routineId')).toBe(true);
    expect(errors.some(e => e.property === 'name')).toBe(true);
  });

  it('should reject missing fields in Split Schedules', async () => {
    const dto = new CreateSplitScheduleDto();
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'splitId')).toBe(true);
  });

  it('should verify endTime > startTime for Workouts', async () => {
    const dto = new CreateWorkoutDto();
    dto.userId = 'uuid';
    dto.routineId = 1;
    dto.startTime = new Date('2024-01-01T10:00:00Z').toISOString();
    dto.endTime = new Date('2024-01-01T09:00:00Z').toISOString(); // Earlier than start
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'endTime')).toBe(true);
  });

  it('should pass endTime > startTime for Workouts if correct', async () => {
    const dto = new CreateWorkoutDto();
    dto.userId = 'uuid';
    dto.routineId = 1;
    dto.startTime = new Date('2024-01-01T10:00:00Z').toISOString();
    dto.endTime = new Date('2024-01-01T11:00:00Z').toISOString(); // Later than start
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'endTime')).toBe(false);
  });

  it('should verify empty name rejection for Splits', async () => {
    const dto = new CreateSplitDto();
    dto.userId = 'uuid';
    dto.name = '';
    dto.isActive = true;
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'name')).toBe(true);
  });

  it('should reject string instead of boolean for isActive in Routine', async () => {
    const dto = new CreateRoutineDto();
    dto.userId = 'uuid';
    dto.name = 'Test';
    // @ts-ignore
    dto.isActive = 'true';
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'isActive')).toBe(true);
  });
});
