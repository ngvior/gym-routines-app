# Project Context

**Language & Stack**: NestJS 11, TypeORM, PostgreSQL, TypeScript
**How to Run Locally**: `docker-compose up -d` OR (if DB container is already up) `npm run start:dev`

## Architecture & Code Organization

We follow the standard NestJS Layered Architecture with a specific rule for business logic distribution:

- **Controllers**: Responsible ONLY for handling HTTP requests, mapping payloads to DTOs, and delegating to Services. NO business logic.
- **Services**: Act as clean orchestrators. The logic here should read like a book.
- **Repositories**: All complex business logic, complex queries, and data manipulation MUST be pushed down to custom repositories to prevent bloated, unreadable God-class Services.

## Error Handling

We separate generic HTTP errors from Domain-specific errors:

- **Generic Errors**: Use standard NestJS `HttpExceptions` (e.g., `NotFoundException(404)` for a missing resource).
- **Domain-Specific Errors**: Create and throw custom exceptions that extend standard NestJS exceptions. This prevents duplicating error messages across the app and keeps the standard `{statusCode, message}` structure consistent. _Example: `UserSubscriptionExpiredException` instead of a generic `BadRequestException` with a hardcoded string._

## Data Validation

Strict payload validation at the edge:

- **Global Validation**: We enforce the use of NestJS's `ValidationPipe` globally.
- **DTOs**: Every incoming request payload MUST have a corresponding DTO heavily decorated with `class-validator` and `class-transformer` rules.

## Testing Strategy

As a standard practice, tests are written alongside the code to ensure reliability and serve as documentation:

- **Focus**: Heavy emphasis on Unit Tests for Services and Repositories to isolate and verify core business logic without database dependencies.
- **Integration**: Simple E2E tests for Controllers/Modules to ensure proper wiring.
- **AI Responsibility**: The AI is expected to proactively write, explain, and set up tests when generating new features.

## Code Style & Naming Conventions

- **General Naming**: `lowerCamelCase` for variables, properties, and methods.
- **Database Naming**: `snake_case` strategy for all database tables and columns (enforced via `typeorm-naming-strategies` if not automatically applied).

## Dependencies

- **Allowed Libraries**: Any from `@nestjs/*`, `class-transformer`, `class-validator`, `pg`, `reflect-metadata`, `rxjs`, `typeorm-naming-strategies`.

## API Documentation (Swagger)

All endpoints must be fully documented using `@nestjs/swagger` decorators:

- **DTOs**: Every property must have an `@ApiProperty()` decorator with examples and descriptions.
- **Controllers**: Every route must have `@ApiOperation()`, `@ApiResponse()` (for both success and error cases), and relevant tags.

## Database & Migrations

- **Schema Management**: We NEVER use `synchronize: true` for database changes. All schema changes must be handled via TypeORM migrations.
- **AI Responsibility**: When generating or updating an Entity, the AI must proactively generate the corresponding migration file.

## Authentication & Security

The application uses JWT for authentication (currently user-only, but designed for future role expansion).

- **Default Security**: Assume all new endpoints require authentication (`JwtAuthGuard`) unless explicitly stated otherwise (e.g., login, registration).
- **Token Generation**: The system must handle JWT creation and secure distribution upon successful login.

## Git Workflow

We strictly follow [Conventional Commits](https://www.conventionalcommits.org/).

- **Format**: `type(scope?): description` (e.g., `feat(auth): add user login`, `fix(db): resolve missing foreign key`).
- **AI Responsibility**: The AI must craft concise, standard-compliant commit messages when performing Git operations.
