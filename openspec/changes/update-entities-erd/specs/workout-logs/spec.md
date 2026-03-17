# Workout Logs Specification

## Purpose

Defines the WorkoutLog domain entity, which records the actual repetitions and loads achieved by a User during a particular Workout session.

## Requirements

### Requirement: Define WorkoutLog Entity Schema Updates

The system MUST update the `WorkoutLog` entity fields to accurately track what was performed versus what was planned.

#### Scenario: Verify Updated WorkoutLog Properties and Relationships

- GIVEN an updated WorkoutLog entity definition
- WHEN mapped to the database schema
- THEN it MUST have an `actualLoad` field mapped to `actual_load` (float)
- AND it MUST have an `actualReps` field mapped to `actual_reps` (integer)
- AND it MUST have a `targetLoadSnapshot` field mapped to `target_load_snapshot` (float) to record the planned target at the time the workout started
- AND it MUST have a `setNumber` field mapped to `set_number` (integer)
- AND it MUST retain its `workoutId` foreign key (`workout_id`)
- AND it MUST retain its `exerciseId` foreign key (`exercise_id`)
- AND it MUST have a `ManyToOne` relationship to `Workout` and `Exercise`

### Requirement: Validate WorkoutLog DTOs

The system MUST validate incoming WorkoutLog payloads.

#### Scenario: Validating actual metrics

- GIVEN a `CreateWorkoutLogDto`
- WHEN `actualReps` or `actualLoad` is negative
- THEN the system MUST reject the payload
- AND WHEN `setNumber` is missing or not an integer
- THEN the system MUST reject the payload
