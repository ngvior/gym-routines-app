import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Routine } from '../../routines/entities/routine.entity';
import { Workout } from '../../workouts/entities/workout.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Routine, (routine) => routine.user)
  routines: Routine[];

  @OneToMany(() => Workout, (workout) => workout.user)
  workouts: Workout[];
}
