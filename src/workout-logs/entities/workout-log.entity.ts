import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Workout } from '../../workouts/entities/workout.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity()
export class WorkoutLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workoutId: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutLogs)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @Column()
  exerciseId: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutLogs)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ type: 'int' })
  actualReps: number;

  @Column({ type: 'float' })
  actualLoad: number;

  @Column({ type: 'int' })
  setNumber: number;
}
