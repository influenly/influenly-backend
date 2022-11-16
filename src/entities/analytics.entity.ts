import {
  BaseEntity,
  Column,
  JoinColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { AnalyticsTwitch } from './analytics-twitch.entity';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Creator } from './creator.entity';

@Entity('analytics')
export class Analytics extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  creatorId!: number;

  @Column({ type: 'int', nullable: true, default: null })
  analyticsYoutubeId!: number;

  @Column({ type: 'int', nullable: true, default: null })
  analyticsTwitchId!: number;

  @Column({ type: 'text' })
  platform!: string;

  @ManyToOne(() => Creator, (creator) => creator.analytics)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator!: Creator;

  @OneToOne(() => AnalyticsYoutube)
  @JoinColumn({ name: 'analyticsYoutubeId', referencedColumnName: 'id' })
  analyticsYoutube!: AnalyticsYoutube;

  @OneToOne(() => AnalyticsTwitch)
  @JoinColumn({ name: 'analyticsTwitchId', referencedColumnName: 'id' })
  analyticsTwitch!: AnalyticsTwitch;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
