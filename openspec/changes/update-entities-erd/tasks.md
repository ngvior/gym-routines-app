# Tasks: Update Entities to Match New ERD

## Phase 1: Foundation (Scaffold New Modules & Entities)

- [x] 1.1 Scaffold `splits` module: Create `src/splits/splits.module.ts`, `splits.controller.ts`, `splits.service.ts`, `entities/split.entity.ts` (UUID PK, name, isActive, relations to User, SplitSchedule, Workout) and DTOs (`create-split.dto.ts`, `update-split.dto.ts`).
- [x] 1.2 Scaffold `split-schedules` module: Create `src/split-schedules/split-schedules.module.ts`, `split-schedules.controller.ts`, `split-schedules.service.ts`, `entities/split-schedule.entity.ts` (id, dayIndex, relations to Split and Routine) and DTOs.
- [x] 1.3 Scaffold `personal-records` module: Create `src/personal-records/personal-records.module.ts`, `personal-records.controller.ts`, `personal-records.service.ts`, `entities/personal-record.entity.ts` (UUID PK, exerciseName, maxLoad, reps, achievedAt, relation to User) and DTOs.
- [x] 1.4 Update `src/app.module.ts` to import `SplitsModule`, `SplitSchedulesModule`, and `PersonalRecordsModule`.

## Phase 2: Core Implementation (Update Existing Entities)

- [x] 2.1 Update `src/users/entities/user.entity.ts`: Add `@OneToMany` relations for `splits` and `personalRecords`.
- [x] 2.2 Update `src/routines/entities/routine.entity.ts`: Add `@OneToMany` relation for `splitSchedules`. Verify existing relations to User, Exercise, Workout.
- [x] 2.3 Update `src/exercises/entities/exercise.entity.ts`: Remove `dayOfWeek` column. Add `orderIndex` (integer) column. Verify `routineId` foreign key and `@ManyToOne` relation to `Routine`.
- [x] 2.4 Update `src/target-sets/entities/target-set.entity.ts`: Map columns to snake_case (`target_reps`, `target_load`, `order_index`). Verify `@ManyToOne` relation to `Exercise`.
- [x] 2.5 Update `src/workouts/entities/workout.entity.ts`: Remove `date` and `completedAt` columns. Add `splitId` (nullable foreign key), `startTime` (Date), and `endTime` (nullable Date) columns. Add `@ManyToOne` relation to `Split`.
- [x] 2.6 Update `src/workout-logs/entities/workout-log.entity.ts`: Add `targetLoadSnapshot` (`target_load_snapshot`, float) column. Map existing columns to snake_case (`actual_load`, `actual_reps`, `set_number`).

## Phase 3: Integration & Validation (Update DTOs)

- [x] 3.1 Update `src/exercises/dto/create-exercise.dto.ts` & `update-exercise.dto.ts`: Remove `dayOfWeek` validation. Add `@IsNumber()`, `@IsOptional()` or strict validations for `orderIndex`. Ensure `routineId` and `name` are required.
- [x] 3.2 Update `src/target-sets/dto/create-target-set.dto.ts` & `update-target-set.dto.ts`: Add `@Min(0)` validation to reject negative numbers for `targetReps`, `targetLoad`, and `orderIndex`.
- [x] 3.3 Update `src/workouts/dto/create-workout.dto.ts` & `update-workout.dto.ts`: Remove `date` and `completedAt`. Add `@IsUUID()` for `splitId` (optional), `@IsDateString()` for `startTime` and `endTime`. Add custom validation to ensure `endTime` is logically after `startTime`.
- [x] 3.4 Update `src/workout-logs/dto/create-workout-log.dto.ts` & `update-workout-log.dto.ts`: Add `@Min(0)` for `actualReps` and `actualLoad`. Ensure `setNumber` is an integer. Add validation for `targetLoadSnapshot` (optional, number).
- [x] 3.5 Write tests for DTO validations: Verify negative value rejection for PRs, TargetSets, WorkoutLogs; verify missing fields rejection in Exercise/Split schedules; verify `endTime > startTime` for Workouts; verify empty name rejection for Splits.
- [x] 3.6 Update `src/users/dto/create-user.dto.ts` & `update-user.dto.ts`: Ensure `@IsEmail()` and string validations reject malformed data.
- [x] 3.7 Update `src/routines/dto/create-routine.dto.ts` & `update-routine.dto.ts`: Ensure strict boolean typing for `isActive` (reject string instead of boolean).

## Phase 4: Compilation & Service Fixes

- [x] 4.1 Fix compilation errors in `src/exercises/exercises.service.ts` and related controllers due to the removal of `dayOfWeek` and addition of `orderIndex`.
- [x] 4.2 Fix compilation errors in `src/workouts/workouts.service.ts` and related controllers due to renaming `date`/`completedAt` to `startTime`/`endTime`.
- [x] 4.3 Verify the entire application compiles successfully (`npm run build`).

## Phase 5: Migration Generation & Data Preservation

- [x] 5.1 Generate the TypeORM schema migration (Delegated to user: Run `docker-compose up -d` and `npm run migration:generate -- src/db/migrations/InitialSchema`).
- [x] 5.2 Edit the generated migration file to include custom UP/DOWN logic (Skipped: database does not exist yet, the initial migration will create the whole schema from scratch).
- [x] 5.3 Run the migration locally (Delegated to user: Run `npm run migration:run` or equivalent command).
