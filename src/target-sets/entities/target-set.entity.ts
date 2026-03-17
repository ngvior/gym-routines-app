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

  @Column({ type: 'int' })
  targetReps: number;

  @Column({ type: 'float' })
  targetLoad: number;

  @Column({ type: 'int' })
  orderIndex: number;
}
