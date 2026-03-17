# Personal Records Specification

## Purpose

Defines the PersonalRecord domain entity, tracking a user's best performance metrics over time.

## Requirements

### Requirement: Define PersonalRecord Entity Schema

The system MUST define a `PersonalRecord` entity that records highest achievements for exercises.

#### Scenario: Verify PersonalRecord Properties and Relationships

- GIVEN a PersonalRecord entity definition
- WHEN mapped to the database schema
- THEN it MUST have a primary key `id`
- AND it MUST have an `exerciseName` field (string) or relation to standard exercises
- AND it MUST have a `maxLoad` field (float)
- AND it MUST have a `reps` field (integer)
- AND it MUST have an `achievedAt` field (Date timestamp)
- AND it MUST have a `ManyToOne` relationship to `User` (`user_id`)

### Requirement: Validate PersonalRecord DTOs

The system MUST validate incoming PersonalRecord payloads.

#### Scenario: Validating PersonalRecord Payload

- GIVEN a `CreatePersonalRecordDto`
- WHEN `maxLoad` or `reps` is a negative number
- THEN the payload MUST be rejected
