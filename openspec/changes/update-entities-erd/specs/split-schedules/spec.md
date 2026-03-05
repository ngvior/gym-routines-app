# Split Schedules Specification

## Purpose

Defines the SplitSchedule domain entity. A schedule links a training Split to a specific Routine on a given day index.

## Requirements

### Requirement: Define SplitSchedule Entity Schema

The system MUST define a `SplitSchedule` entity to map splits to routines based on days.

#### Scenario: Verify SplitSchedule Properties and Relationships

- GIVEN a SplitSchedule entity definition
- WHEN mapped to the database schema
- THEN it MUST have a primary key `id`
- AND it MUST have a `dayIndex` field (integer) representing the day in the split cycle
- AND it MUST have a `ManyToOne` relationship to `Split` (`split_id`)
- AND it MUST have a `ManyToOne` relationship to `Routine` (`routine_id`)

### Requirement: Validate SplitSchedule DTOs

The system MUST validate incoming SplitSchedule payloads.

#### Scenario: Validating a SplitSchedule Creation

- GIVEN a `CreateSplitScheduleDto`
- WHEN `dayIndex`, `splitId`, or `routineId` is missing or not a valid number
- THEN the system MUST reject the payload
