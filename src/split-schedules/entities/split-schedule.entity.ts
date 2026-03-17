import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Split } from '../../splits/entities/split.entity';
import { Routine } from '../../routines/entities/routine.entity';

@Entity()
export class SplitSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  splitId: string;

  @ManyToOne(() => Split, (split) => split.splitSchedules)
  @JoinColumn({ name: 'split_id' })
  split: Split;

  @Column()
  routineId: number;

  @ManyToOne(() => Routine, (routine) => routine.splitSchedules)
  @JoinColumn({ name: 'routine_id' })
  routine: Routine;

  @Column({ type: 'int', name: 'day_index' })
  dayIndex: number;
}
