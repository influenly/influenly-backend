import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { Integration } from './integration.entitiy';
import { Analytics } from './analytics.entity';

@Unique(['analyticsId', 'integrationId'])
@Entity('analytics_youtube')
export class AnalyticsYoutube extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  analyticsId: number;

  @Column('int', { unique: true })
  integrationId: number;

  @Column({ type: 'int', nullable: true })
  totalSubs: number;

  @Column({ type: 'int', nullable: true })
  totalVideos: number;

  @Column({ type: 'int', nullable: true })
  totalLikes: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Analytics)
  @JoinColumn({ name: 'analyticsId' })
  analytics: Analytics;

  @OneToOne(() => Integration)
  @JoinColumn({ name: 'integrationId' })
  integration: Integration;
}
