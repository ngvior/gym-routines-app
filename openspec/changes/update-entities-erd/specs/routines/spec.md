# Routines Specification

## Purpose

Defines the Routine domain entity. Routines group exercises together into a single session plan.

## Requirements

### Requirement: Define Routine Entity Schema Updates

The system MUST update the `Routine` entity to align with new fields and relationships, notably removing direct split logic like days of week from routines if applicable, and relying on `SplitSchedule` instead.

#### Scenario: Verify Updated Routine Relationships

- GIVEN an updated Routine entity definition
- WHEN mapped to the database schema
- THEN it MUST have a `OneToMany` relationship to `SplitSchedule`
- AND it MUST retain its `OneToMany` relationship to `Exercise`
- AND it MUST retain its `OneToMany` relationship to `Workout`
- AND it MUST retain its `ManyToOne` relationship to `User` (`user_id`)

### Requirement: Validate Routine DTOs

The system MUST validate incoming payloads using strict class-validator rules.

#### Scenario: Updating a Routine

- GIVEN an `UpdateRoutineDto`
- WHEN valid fields are provided
- THEN the system MUST accept the payload
- AND WHEN invalid types are provided for properties like `isActive` (e.g., string instead of boolean)
- THEN the system MUST reject the payload
