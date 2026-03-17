# Product Requirements Document (PRD): Gym Routines App

## 1. Product Overview

**Product Name:** Gym Routines App  
**Purpose:** A pragmatic, personal fitness tracking application that allows users to design their workout splits (e.g., Push/Pull/Legs), build specific routines, and track their actual performance (reps/weight) against their planned targets over time.  
**Vision:** Move away from messy spreadsheets and generic fitness apps. Provide a structured, data-driven way to track progressive overload, monitor workout volumes, and celebrate personal records (PRs) automatically.

---

## 2. Target Audience

- **The Data-Driven Lifter:** Wants to know exactly what they lifted last week without guessing.
- **The Structured Gym-Goer:** Follows specific multi-day splits (PPL, Upper/Lower, Bro Split) and needs a tool that understands weekly scheduling.

---

## 3. Data Architecture Overview (ERD Foundation)

The system is built on a relational database architecture (PostgreSQL via TypeORM) mapped precisely to the domain:

- **Core Entities:** `USERS`
- **Planning Entities:** `SPLITS`, `SPLIT_SCHEDULE`, `ROUTINES`, `EXERCISES`, `TARGET_SETS`
- **Execution Entities:** `WORKOUTS`, `WORKOUT_LOGS`
- **Analytics Entities:** `PERSONAL_RECORDS`

_Crucial Design Decision:_ `WORKOUT_LOGS` includes a `target_load_snapshot`. This ensures that historical workouts do not change if a user later updates their target load in the `TARGET_SETS` blueprint.

---

## 4. Epics & Feature Requirements

_Note: Requirements are mapped directly to Jira Epics and Tasks to guide development prioritization._

### Epic 1: Project Setup & Configuration `[ROUT-1]` _(Completed)_

_Foundation of the application._

- **Scope:** Initialization of NestJS repo, Docker Compose, Env Setup, and TypeORM installation.

### Epic 2: Database Design `[ROUT-7]`

_Mapping the ERD to TypeORM Entities._

- **Scope:** Creation of all schema entities defining the domain boundaries.
- **Req 2.1:** Implement `User` and `Routine` schemas. `[ROUT-8]`
- **Req 2.2:** Implement `Exercise` and `TargetSet` schemas. `[ROUT-11]`
- **Req 2.3:** Implement `Workout` and `WorkoutLog` schemas. `[ROUT-14]`
- **Req 2.4:** Implement `Split` and `SplitSchedule` schemas. `[ROUT-44]`
- **Req 2.5:** Implement `PersonalRecord` schema. `[ROUT-47]`

### Epic 3: Auth & Authorization `[ROUT-17]`

_Security and user isolation._

- **Req 3.1 - Login Implementation:** Secure login endpoint using bcrypt and JWT token generation. `[ROUT-18]`
- **Req 3.2 - Route Protection:** Implement `JwtStrategy` and a Global Guard to ensure all user data is isolated and protected. `[ROUT-21]`
- _Acceptance Criteria:_ Endpoints must extract the `user_id` from the JWT context rather than trusting client payloads.

### Epic 4: Routine Management API `[ROUT-24]`

_Building the workout blueprints._

- **Req 4.1 - Create Routine:** Endpoint to create routines (e.g., "Push Day"). Must include strict DTO validation and handle relational database transactions (e.g., creating a routine, its exercises, and target sets together). `[ROUT-25]`
- **Req 4.2 - Get Routines:** Fetch routines associated with the authenticated user. `[ROUT-28]`

### Epic 4.9: Split Management System `[ROUT-49]`

_Organizing routines into weekly blocks._

- **Req 4.9.1 - CRUD Splits:** Users can create weekly splits and fetch their active split. `[ROUT-50]`
- _Acceptance Criteria:_ A Split must allow mapping routines to specific days of the week (`day_of_week` 1-7) via `SplitSchedule`.

### Epic 5: Workout Logging API `[ROUT-29]`

_The core in-gym execution experience. Must be fast and frictionless._

- **Req 5.1 - Log Workout:** Endpoint to record an entire workout session. `[ROUT-30]`
- **Req 5.2 - Data Integrity:** Must include robust log validation. `[ROUT-31]`
- **Req 5.3 - Performance:** Must support bulk inserting of workout logs so a user can save an entire session rapidly. `[ROUT-32]`
- _Acceptance Criteria:_ The system must record `target_load_snapshot` alongside `actual_load` and `actual_reps`.

### Epic 6: Metrics Engine `[ROUT-33]`

_Gamification and tracking progressive overload._

- **Req 6.1 - Volume Calculation:** Calculate weekly workout volume to track progression. Includes week range helpers and complex queries. `[ROUT-34]`
- **Req 6.2 - PR Detection Logic:** Automatically compare `actual_load` and `actual_reps` against historical records. Update `PERSONAL_RECORDS` when a new max load is achieved. `[ROUT-37, ROUT-38]`
- **Req 6.3 - Consistency Score:** Track user adherence to their planned active split. `[ROUT-39]`

### Epic 7: Testing `[ROUT-40]`

_Ensuring reliability._

- **Req 7.1 - Unit Tests:** Core business logic (especially the Metrics Engine and service transactions) must be covered by unit tests. `[ROUT-41]`

### Epic 8: Deployment `[ROUT-42]`

_Taking it live._

- **Req 8.1 - Production Readiness:** Create a multi-stage Dockerfile optimized for a production deployment. `[ROUT-43]`

---

## 5. Core User Flows

1. **The Sunday Setup (Planning):**
   `Create Split [ROUT-50]` → `Create Routines [ROUT-25]` → `Add Exercises & Target Sets` → `Schedule Routines to Split Days`.
2. **The Gym Session (Execution):**
   `Open App` → `Select Today's Routine` → `Start Workout` → `Log Actuals vs Targets (Bulk Insert) [ROUT-32]` → `End Workout`.
3. **The Review (Progression):**
   `Engine Calculates Volume [ROUT-34]` → `Engine Detects PRs [ROUT-37]` → `User Reviews Metrics`.

---

## 6. Non-Functional Requirements

- **Performance:** Logging sets (via bulk insert) must be highly performant to account for poor network connectivity in gyms.
- **Data Integrity:** Routine templates (`ROUTINES`) act as blueprints. Workouts (`WORKOUTS`) act as immutable historical ledgers.
- **API Design:** RESTful structure using NestJS, fully documented via Swagger for easy frontend integration.
