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
import { Integration } from './integration.entity';

@Entity('analytics_youtube')
export class AnalyticsYoutube extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', unique: true })
  integrationId: number;

  @Column({ type: 'varchar', unique: true })
  channelId: string;

  @Column({ type: 'int' })
  totalSubs: number;

  @Column({ type: 'int' })
  totalVideos: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Integration)
  @JoinColumn({ name: 'integrationId' })
  integration: Integration;
}
