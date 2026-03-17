import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PersonalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.personalRecords)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  exerciseName: string;

  @Column({ type: 'float' })
  maxLoad: number;

  @Column({ type: 'int' })
  reps: number;

  @Column({ type: 'timestamp' })
  achievedAt: Date;
}
