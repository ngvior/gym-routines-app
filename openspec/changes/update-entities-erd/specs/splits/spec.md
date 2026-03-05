# Splits Specification

## Purpose

Defines the Split domain entity. A "Split" represents a training program grouping routines together (e.g., Push/Pull/Legs).

## Requirements

### Requirement: Define Split Entity Schema

The system MUST define a `Split` entity that belongs to a user and has multiple schedules and workouts.

#### Scenario: Verify Split Properties and Relationships

- GIVEN a Split entity definition
- WHEN mapped to the database schema
- THEN it MUST have a numeric or UUID primary key `id`
- AND it MUST have a `name` field (string)
- AND it MUST have an `isActive` field (boolean, default true)
- AND it MUST have a `ManyToOne` relationship to `User` (`user_id`)
- AND it MUST have a `OneToMany` relationship to `SplitSchedule`
- AND it MUST have a `OneToMany` relationship to `Workout`

### Requirement: Validate Split DTOs

The system MUST validate incoming Split payloads for creating and updating splits.

#### Scenario: Validating a new Split

- GIVEN a `CreateSplitDto`
- WHEN the `name` is empty or missing
- THEN the validation MUST fail and return an error
- AND WHEN the `name` is provided
- THEN the validation MUST pass
