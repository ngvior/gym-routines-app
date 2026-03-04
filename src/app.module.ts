import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import TypeOrmModule from './db/database.config';
import { UsersModule } from './users/users.module';
import { RoutinesModule } from './routines/routines.module';
import { ExercisesModule } from './exercises/exercises.module';
import { TargetSetsModule } from './target-sets/target-sets.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { WorkoutLogsModule } from './workout-logs/workout-logs.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule,
    UsersModule,
    RoutinesModule,
    ExercisesModule,
    TargetSetsModule,
    WorkoutsModule,
    WorkoutLogsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
