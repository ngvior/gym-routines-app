# Users Specification

## Purpose

Defines the User domain entity, which acts as the root owner of splits, personal records, routines, and workouts.

## Requirements

### Requirement: Define User Entity Schema

The system MUST track core user information and associate users with their gym progression data (splits and personal records).

#### Scenario: Verify User Relationships

- GIVEN a User entity definition
- WHEN mapped to the database schema
- THEN it MUST have a `OneToMany` relationship to `Split`
- AND it MUST have a `OneToMany` relationship to `PersonalRecord`
- AND it MUST retain its `OneToMany` relationships to `Routine` and `Workout`

### Requirement: Validate User Payloads

The system MUST strictly validate any User-related DTOs to maintain data integrity.

#### Scenario: Invalid User Payload

- GIVEN an incoming payload to create or update a user
- WHEN the payload contains malformed data (e.g., invalid email)
- THEN the application MUST throw a validation error
