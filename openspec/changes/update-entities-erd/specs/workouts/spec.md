# Workouts Specification

## Purpose

Defines the Workout domain entity, which represents an actual training session executed by a User based on a Routine and optionally a Split.

## Requirements

### Requirement: Define Workout Entity Schema Updates

The system MUST update the `Workout` entity to reflect changes in its scheduling relations, adding `split_id` and replacing simple date fields with explicit `start_time` and `end_time`.

#### Scenario: Verify Updated Workout Properties and Relationships

- GIVEN an updated Workout entity definition
- WHEN mapped to the database schema
- THEN it MUST have a `splitId` foreign key (`split_id`, nullable if a routine is done ad-hoc)
- AND it MUST have a `startTime` field mapped to `start_time` (Date)
- AND it MUST have an `endTime` field mapped to `end_time` (Date, nullable)
- AND it MUST retain its `routineId` foreign key (`routine_id`)
- AND it MUST retain its `userId` foreign key (`user_id`)
- AND it MUST have a `ManyToOne` relationship to `User`, `Routine`, and `Split`
- AND it MUST have a `OneToMany` relationship to `WorkoutLog`

### Requirement: Validate Workout DTOs

The system MUST strictly validate any Workout-related payloads.

#### Scenario: Invalid Timestamps

- GIVEN an `UpdateWorkoutDto` marking a workout as completed
- WHEN `endTime` is logically before `startTime`
- THEN the system SHOULD reject the payload with a validation error
