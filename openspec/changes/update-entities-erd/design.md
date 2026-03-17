# Design: Update Entities to Match New ERD

## Technical Approach

We will restructure the TypeORM entities and their relations to reflect the new domain model required for splits and personal records. This involves scaffolding three new modules (`splits`, `split-schedules`, `personal-records`) with their respective entities, DTOs, controllers, and services using NestJS conventions. We will then update existing entities (`User`, `Routine`, `Exercise`, `TargetSet`, `Workout`, `WorkoutLog`) to match the new schema fields and relations. All DTOs will be updated to validate the incoming payloads using `class-validator`. Lastly, an automated TypeORM migration will be generated to apply these schema changes safely. We will write custom UP/DOWN logic in the migration if necessary to preserve data for renamed columns (e.g., migrating `completedAt` to `endTime`).

## Architecture Decisions

### Decision: Scaffold New Domain Entities as Independent Modules

**Choice**: Create separate NestJS modules for `splits`, `split-schedules`, and `personal-records`.
**Alternatives considered**: Group them inside the existing `routines` or `users` modules.
**Rationale**: Following NestJS best practices, maintaining distinct bounded contexts prevents bloated god-modules. A `Split` can contain multiple `SplitSchedules` and potentially stand alone as a domain concept, making independent modules the most scalable approach.

### Decision: Removal of `dayOfWeek` from `Exercise`

**Choice**: Remove the `dayOfWeek` column from the `Exercise` entity and instead use `orderIndex` to sort exercises within a `Routine`.
**Alternatives considered**: Keep `dayOfWeek` on `Exercise`.
**Rationale**: Scheduling is now strictly the responsibility of the new `SplitSchedule` entity (which maps a `Split` to a `Routine` for a specific day). `Exercise` should only define "what to do" within a `Routine`, not "when to do it".

### Decision: Snapshotting Target Load in `WorkoutLog`

**Choice**: Add `targetLoadSnapshot` directly to the `WorkoutLog` entity.
**Alternatives considered**: Dynamically calculate the target load by joining `TargetSet` during read operations.
**Rationale**: `TargetSet`s can change over time as the user progresses or edits their routines. A workout log must reflect historical reality (the target at the moment the workout occurred). Storing a snapshot guarantees data integrity for historical analytics.

### Decision: Entity ID Types

**Choice**: Use `uuid` for new top-level entities like `Split` and `PersonalRecord` but keep existing `int` primary keys where they currently exist (e.g., `Routine`, `Exercise`, `Workout`).
**Alternatives considered**: Migrate all entities to `uuid`.
**Rationale**: A full PK type migration would require cascading foreign key updates and data type conversions which are out of scope and highly risky. We will respect existing ID conventions.

## Data Flow

    [Client] ──(HTTP POST)──→ [Controller] ──→ [Service] ──→ [Repository] ──→ [PostgreSQL]
                                    │               │              │
                                  [DTO]       [Entity logic]    [TypeORM]
                               (Validation)

When a User tracks a Workout:

1. The App fetches the `Split` and its active `SplitSchedule` for today, yielding a `Routine` and its `Exercises`/`TargetSets`.
2. The user logs their sets.
3. The App submits a `CreateWorkoutDto` containing `startTime`, `endTime`, `splitId`, `routineId`, and an array of `WorkoutLogs`.
4. The backend validates and persists these to the `Workout` and `WorkoutLog` tables, capturing `targetLoadSnapshot`.

## File Changes

| File                                                      | Action | Description                                                             |
| --------------------------------------------------------- | ------ | ----------------------------------------------------------------------- |
| `src/splits/entities/split.entity.ts`                     | Create | New entity for training splits.                                         |
| `src/splits/dto/create-split.dto.ts`                      | Create | DTO for creating splits.                                                |
| `src/splits/dto/update-split.dto.ts`                      | Create | DTO for updating splits.                                                |
| `src/splits/splits.module.ts`                             | Create | Nest module for splits.                                                 |
| `src/splits/splits.service.ts`                            | Create | Service for splits.                                                     |
| `src/splits/splits.controller.ts`                         | Create | Controller for splits.                                                  |
| `src/split-schedules/entities/split-schedule.entity.ts`   | Create | New entity mapping splits to routines for specific days.                |
| `src/split-schedules/dto/create-split-schedule.dto.ts`    | Create | DTO for split schedules.                                                |
| `src/split-schedules/split-schedules.module.ts`           | Create | Nest module for split schedules.                                        |
| `src/personal-records/entities/personal-record.entity.ts` | Create | New entity for tracking PRs.                                            |
| `src/personal-records/dto/create-personal-record.dto.ts`  | Create | DTO for PRs.                                                            |
| `src/personal-records/personal-records.module.ts`         | Create | Nest module for PRs.                                                    |
| `src/users/entities/user.entity.ts`                       | Modify | Add `OneToMany` relations for `splits` and `personalRecords`.           |
| `src/routines/entities/routine.entity.ts`                 | Modify | Add `OneToMany` relation for `splitSchedules`.                          |
| `src/exercises/entities/exercise.entity.ts`               | Modify | Remove `dayOfWeek`, add `orderIndex`.                                   |
| `src/exercises/dto/create-exercise.dto.ts`                | Modify | Update validation for `orderIndex` and remove `dayOfWeek`.              |
| `src/workouts/entities/workout.entity.ts`                 | Modify | Add `splitId`, `startTime`, `endTime`. Remove `date`, `completedAt`.    |
| `src/workouts/dto/create-workout.dto.ts`                  | Modify | Update validation for `splitId`, `startTime`, `endTime`.                |
| `src/workout-logs/entities/workout-log.entity.ts`         | Modify | Add `targetLoadSnapshot`.                                               |
| `src/workout-logs/dto/create-workout-log.dto.ts`          | Modify | Add validation for `targetLoadSnapshot`.                                |
| `src/app.module.ts`                                       | Modify | Import new `splits`, `split-schedules`, and `personal-records` modules. |

## Interfaces / Contracts

```typescript
// Example Interface for CreateWorkoutDto
export class CreateWorkoutDto {
  @IsUUID()
  @IsOptional()
  splitId?: string;

  @IsNumber()
  routineId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  @IsOptional()
  endTime?: string;
}

// Example Interface for CreateWorkoutLogDto
export class CreateWorkoutLogDto {
  @IsNumber()
  exerciseId: number;

  @IsNumber()
  actualReps: number;

  @IsNumber()
  actualLoad: number;

  @IsNumber()
  @IsOptional()
  targetLoadSnapshot?: number;

  @IsNumber()
  setNumber: number;
}
```

## Testing Strategy

| Layer       | What to Test     | Approach                                                                                                                                             |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit        | Validation Rules | Test the DTOs with `class-validator` passing valid/invalid payloads to ensure strict validation at the edge.                                         |
| Integration | Entity Relations | Ensure TypeORM correctly sets up foreign keys and cascades by saving a `Split` with a nested `SplitSchedule` in an in-memory/test DB.                |
| Migration   | Data integrity   | Test the migration locally against the current dev DB to ensure `date`/`completedAt` are safely migrated to `startTime`/`endTime` without data loss. |

## Migration / Rollout

A TypeORM migration must be generated and applied.
Because we are modifying existing columns (`date` -> `startTime`, `completedAt` -> `endTime`), the generated migration should be manually reviewed and updated to include raw SQL data transfer before dropping the old columns:

1. `ALTER TABLE "workout" ADD "start_time" TIMESTAMP`
2. `UPDATE "workout" SET "start_time" = "date"`
3. `ALTER TABLE "workout" DROP COLUMN "date"`
   This ensures we don't lose users' historical workout data.

## Open Questions

- None
