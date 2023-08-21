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

@Entity('creator_info')
export class CreatorInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: true, unique: true })
  analyticsYoutubeId: number;

  @Column('int', { nullable: true, unique: true })
  analyticsTikTokId: number;

  @Column('varchar', { unique: true, length: 50 })
  username: string;

  @Column('varchar', { length: 50 })
  profileImg: string;

  @Column('varchar', { array: true })
  socialNetworks: string[];

  @Column('varchar', { length: 400 })
  description: string;

  @Column('varchar', { length: 60, array: true })
  contentTags: string[];

  @Column({ type: 'date' })
  birthDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => AnalyticsYoutube)
  @JoinColumn({ name: 'analyticsYoutubeId' })
  analyticsYoutube: AnalyticsYoutube;
}
