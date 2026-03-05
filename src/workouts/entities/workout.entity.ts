import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Routine } from '../../routines/entities/routine.entity';
import { WorkoutLog } from '../../workout-logs/entities/workout-log.entity';
import { Split } from '../../splits/entities/split.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.workouts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  routineId: number;

  @ManyToOne(() => Routine, (routine) => routine.workouts)
  @JoinColumn({ name: 'routine_id' })
  routine: Routine;

  @Column({ type: 'uuid', nullable: true })
  splitId: string | null;

  @ManyToOne(() => Split, (split) => split.workouts, { nullable: true })
  @JoinColumn({ name: 'split_id' })
  split: Split;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @OneToMany(() => WorkoutLog, (workoutLog) => workoutLog.workout)
  workoutLogs: WorkoutLog[];
}
