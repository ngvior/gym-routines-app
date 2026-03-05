import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Routine } from '../../routines/entities/routine.entity';
import { TargetSet } from '../../target-sets/entities/target-set.entity';
import { WorkoutLog } from '../../workout-logs/entities/workout-log.entity';

export enum MuscleGroup {
  CHEST = 'CHEST',
  BACK = 'BACK',
  LEGS = 'LEGS',
  SHOULDERS = 'SHOULDERS',
  ARMS = 'ARMS',
  CORE = 'CORE',
  CARDIO = 'CARDIO',
  FULL_BODY = 'FULL_BODY',
}

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  routineId: number;

  @ManyToOne(() => Routine, (routine) => routine.exercises)
  @JoinColumn({ name: 'routine_id' })
  routine: Routine;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: MuscleGroup })
  muscleGroup: MuscleGroup;

  @Column({ type: 'int', name: 'order_index' })
  orderIndex: number;

  @OneToMany(() => TargetSet, (targetSet) => targetSet.exercise)
  targetSets: TargetSet[];

  @OneToMany(() => WorkoutLog, (workoutLog) => workoutLog.exercise)
  workoutLogs: WorkoutLog[];
}
