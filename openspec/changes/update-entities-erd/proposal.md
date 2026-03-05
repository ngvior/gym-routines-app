# Proposal: Update Entities to Match New ERD

## Intent

Update the core domain models (Entities and DTOs) to align with the new Entity-Relationship Diagram (ERD). This will restructure how Routines, Exercises, Workouts, and Workout Logs relate to each other, and introduce new domain concepts such as training Splits, Split Schedules, and Personal Records to better model realistic gym routines and progression tracking.

## Scope

### In Scope

- Create new `Split` entity and corresponding DTOs (Create/Update).
- Create new `SplitSchedule` entity and DTOs.
- Create new `PersonalRecord` entity and DTOs.
- Update `User` entity to reference `Splits` and `PersonalRecords`.
- Update `Routine` entity to align with new fields and relationships (link to `SplitSchedule` and `Workouts`).
- Update `Exercise` entity (change relationship to belong directly to a `Routine` if not already).
- Update `TargetSet` entity (`target_reps`, `target_load`, `order_index`).
- Update `Workout` entity fields (`split_id`, `start_time`, `end_time` replacing `date`/`completedAt`).
- Update `WorkoutLog` entity fields (`actual_load`, `actual_reps`, `target_load_snapshot`).
- Update all corresponding DTOs to reflect the entity changes with appropriate validation decorators.
- Generate the TypeORM migration to apply these schema changes.

### Out of Scope

- Implementation of complex business logic for automatically updating Personal Records (only CRUD and schema setup for now).
- End-to-end refactor of all services/controllers (this proposal focuses strictly on entities, DTOs, and schema migrations; services will be updated minimally to compile, but deeper logic changes are deferred).

## Approach

We will start by creating the new entities (`Split`, `SplitSchedule`, `PersonalRecord`) and their basic CRUD DTOs. We will then iteratively update the existing entities (`User`, `Routine`, `Exercise`, `TargetSet`, `Workout`, `WorkoutLog`) to match the new columns and foreign key relations mapped from the ERD. After verifying the entities are correctly decorated with TypeORM relations (`@ManyToOne`, `@OneToMany`), we will update the validation rules in the associated `create-*.dto.ts` and `update-*.dto.ts` files using `class-validator`. Finally, we will generate a single comprehensive TypeORM migration to push the schema changes to the PostgreSQL database.

## Affected Areas

| Area                                              | Impact   | Description                                |
| ------------------------------------------------- | -------- | ------------------------------------------ |
| `src/splits/*`                                    | New      | Defines Split entity and DTOs              |
| `src/split-schedules/*`                           | New      | Defines SplitSchedule entity and DTOs      |
| `src/personal-records/*`                          | New      | Defines PersonalRecord entity and DTOs     |
| `src/users/entities/user.entity.ts`               | Modified | Adds relations for splits, PRs             |
| `src/routines/entities/routine.entity.ts`         | Modified | Updates fields and relations               |
| `src/routines/dto/*`                              | Modified | Updates validation fields                  |
| `src/exercises/entities/exercise.entity.ts`       | Modified | Assures `routine_id` relation              |
| `src/exercises/dto/*`                             | Modified | Updates validation fields                  |
| `src/target-sets/entities/target-set.entity.ts`   | Modified | Updates target fields (`target_load`, etc) |
| `src/target-sets/dto/*`                           | Modified | Updates validation fields                  |
| `src/workouts/entities/workout.entity.ts`         | Modified | Adds `split_id`, updates timestamps        |
| `src/workouts/dto/*`                              | Modified | Updates validation fields                  |
| `src/workout-logs/entities/workout-log.entity.ts` | Modified | Adds snapshot and actual metric fields     |
| `src/workout-logs/dto/*`                          | Modified | Updates validation fields                  |

## Risks

| Risk                         | Likelihood | Mitigation                                                                                                                                                                                                                                              |
| ---------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data Loss during Migration   | High       | Since fields like `date` and `completedAt` on `Workout` are changing, the migration might drop columns if not careful. Mitigation: write custom UP/DOWN logic in the generated migration to migrate existing data before dropping columns if necessary. |
| Cascading Compilation Errors | Medium     | Changing DTOs and entities will break existing Services and Controllers. Mitigation: update all references locally to ensure the application compiles successfully before completing the change.                                                        |

## Rollback Plan

If the schema changes cause issues or the migration fails, we will revert the database state by running `npm run typeorm migration:revert`. Code changes can be rolled back using standard git operations to revert the commit.

## Dependencies

- Existing database must be running to test the migration generation.
- TypeORM CLI must be available to generate the migration.

## Success Criteria

- [ ] `Split`, `SplitSchedule`, and `PersonalRecord` modules (entities & DTOs) are created.
- [ ] Existing entities (`User`, `Routine`, `Exercise`, `TargetSet`, `Workout`, `WorkoutLog`) exactly reflect the fields and relationships defined in the provided Mermaid ERD.
- [ ] All DTOs validate incoming payloads against the new entity schemas using `class-validator`.
- [ ] A TypeORM migration is successfully generated.
- [ ] The NestJS application successfully compiles and starts with no TS errors.
