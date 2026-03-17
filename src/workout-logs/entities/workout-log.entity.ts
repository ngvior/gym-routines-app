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

  @Column({ type: 'int', name: 'actual_reps' })
  actualReps: number;

  @Column({ type: 'float', name: 'actual_load' })
  actualLoad: number;

  @Column({ type: 'float', name: 'target_load_snapshot', nullable: true })
  targetLoadSnapshot: number;

  @Column({ type: 'int', name: 'set_number' })
  setNumber: number;
}
