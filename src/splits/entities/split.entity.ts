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
import { SplitSchedule } from '../../split-schedules/entities/split-schedule.entity';
import { Workout } from '../../workouts/entities/workout.entity';

@Entity()
export class Split {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.splits)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SplitSchedule, (splitSchedule) => splitSchedule.split)
  splitSchedules: SplitSchedule[];

  @OneToMany(() => Workout, (workout) => workout.split)
  workouts: Workout[];
}
