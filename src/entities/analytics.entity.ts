import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { AnalyticsYoutube } from './analytics-youtube.entity';

@Entity('analytics')
export class Analytics extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int', { nullable: true })
  analyticsYoutubeId: number;

  @Column('int', { nullable: true })
  analyticsTiktokId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => AnalyticsYoutube)
  @JoinColumn({ name: 'analyticsYoutubeId' })
  analyticsYoutube: AnalyticsYoutube;
}
