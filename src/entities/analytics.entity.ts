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
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Creator } from './creator.entity';
import { YoutubeTokenInfo } from './youtube-token-info.entity';

@Entity('analytics')
export class Analytics extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  creatorId!: number;

  @Column({ type: 'int', nullable: true, default: null })
  analyticsYoutubeId!: number;

  @Column({ type: 'int', nullable: true, default: null })
  youtubeTokenInfoId!: number;

  @ManyToOne(() => Creator, (creator) => creator.analytics)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator!: Creator;

  @OneToOne(() => AnalyticsYoutube)
  @JoinColumn({ name: 'analyticsYoutubeId', referencedColumnName: 'id' })
  analyticsYoutube!: AnalyticsYoutube;

  @OneToOne(() => YoutubeTokenInfo)
  @JoinColumn({ name: 'youtubeTokenInfoId', referencedColumnName: 'id' })
  youtubeTokenInfo!: YoutubeTokenInfo;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
