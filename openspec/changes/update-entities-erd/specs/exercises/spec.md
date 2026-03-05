# Exercises Specification

## Purpose

Defines the Exercise domain entity, which represents an instance of an exercise planned inside a Routine.

## Requirements

### Requirement: Define Exercise Entity Schema Updates

The system MUST update the `Exercise` entity to belong directly to a `Routine` and remove unrelated schedule properties (like `dayOfWeek` which moves to `SplitSchedule` if tracking schedule days).

#### Scenario: Verify Updated Exercise Properties and Relationships

- GIVEN an updated Exercise entity definition
- WHEN mapped to the database schema
- THEN it MUST have a `routineId` foreign key (`routine_id`)
- AND it MUST have a `name` field (string)
- AND it MUST have an `orderIndex` field (integer) to track its order within the Routine
- AND it MUST have a `muscleGroup` enum field
- AND it MUST have a `ManyToOne` relationship to `Routine`
- AND it MUST have a `OneToMany` relationship to `TargetSet`
- AND it MUST have a `OneToMany` relationship to `WorkoutLog`

### Requirement: Validate Exercise DTOs

The system MUST validate incoming Exercise payloads.

#### Scenario: Missing required parameters

- GIVEN a `CreateExerciseDto`
- WHEN `routineId` or `name` is missing
- THEN the application MUST throw a validation error
