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
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Workout } from '../../workouts/entities/workout.entity';
import { SplitSchedule } from '../../split-schedules/entities/split-schedule.entity';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.routines)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.routine)
  exercises: Exercise[];

  @OneToMany(() => Workout, (workout) => workout.routine)
  workouts: Workout[];

  @OneToMany(() => SplitSchedule, (splitSchedule) => splitSchedule.routine)
  splitSchedules: SplitSchedule[];
}
