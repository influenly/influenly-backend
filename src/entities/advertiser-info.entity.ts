import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('advertiser_info')
export class AdvertiserInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column('int', { default: 0 })
  credits: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
