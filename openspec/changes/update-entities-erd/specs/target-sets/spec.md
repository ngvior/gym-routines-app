# Target Sets Specification

## Purpose

Defines the TargetSet domain entity, which holds the planned repetition and load targets for an Exercise within a Routine.

## Requirements

### Requirement: Define TargetSet Entity Schema Updates

The system MUST ensure `TargetSet` entity fields map strictly to the snake_case format (`target_reps`, `target_load`, `order_index`).

#### Scenario: Verify Updated TargetSet Properties and Relationships

- GIVEN an updated TargetSet entity definition
- WHEN mapped to the database schema
- THEN it MUST have an `exerciseId` foreign key (`exercise_id`)
- AND it MUST have a `targetReps` field mapped to `target_reps` (integer)
- AND it MUST have a `targetLoad` field mapped to `target_load` (float)
- AND it MUST have an `orderIndex` field mapped to `order_index` (integer) to track the set's sequence
- AND it MUST have a `ManyToOne` relationship to `Exercise`

### Requirement: Validate TargetSet DTOs

The system MUST validate incoming TargetSet payloads.

#### Scenario: Invalid Target Values

- GIVEN a `CreateTargetSetDto` or `UpdateTargetSetDto`
- WHEN `targetReps`, `targetLoad`, or `orderIndex` are negative numbers
- THEN the system MUST reject the payload
