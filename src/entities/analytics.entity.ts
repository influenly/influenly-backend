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
import { Integration } from './integration.entitiy';

@Entity('analytics')
export class Analytics extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  creatorId!: number;

  @Column({ type: 'int', nullable: true, default: null })
  integrationId!: number;

  @Column({ type: 'int', nullable: true, default: null })
  analyticsYoutubeId!: number;

  @ManyToOne(() => Creator, (creator) => creator.analytics)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator!: Creator;

  @OneToOne(() => Integration)
  @JoinColumn({ name: 'integrationId', referencedColumnName: 'id' })
  integration!: Integration;

  @OneToOne(() => AnalyticsYoutube)
  @JoinColumn({ name: 'analyticsYoutubeId', referencedColumnName: 'id' })
  analyticsYoutube!: AnalyticsYoutube;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
