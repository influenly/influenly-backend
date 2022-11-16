import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('analyticsTwitch')
export class AnalyticsTwitch extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  mainCategory!: string;

  @Column({ type: 'int' })
  totalFollowers!: number;

  @Column({ type: 'int' })
  totalSubscribers!: number;

  @Column({ type: 'int' })
  lastMonthNewFollowers!: number;

  @Column({ type: 'int' })
  lastMonthNewSubscribers!: number;

  @Column({ type: 'int' })
  lastTwoMonthStreams!: number;

  @Column({ type: 'int' })
  totalAverageViewDuration!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
