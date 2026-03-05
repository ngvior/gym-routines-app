import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity()
export class TargetSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseId: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.targetSets)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ type: 'int', name: 'target_reps' })
  targetReps: number;

  @Column({ type: 'float', name: 'target_load' })
  targetLoad: number;

  @Column({ type: 'int', name: 'order_index' })
  orderIndex: number;
}
