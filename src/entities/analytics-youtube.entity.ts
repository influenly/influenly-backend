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
import { Integration } from './integration.entity';

@Entity('analytics_youtube')
export class AnalyticsYoutube extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  integrationId: number;

  @Column({ type: 'int' })
  totalSubs: number;

  @Column({ type: 'int' })
  totalVideos: number;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @OneToOne(() => Integration)
  @JoinColumn({ name: 'integrationId' })
  integration: Integration;
}
