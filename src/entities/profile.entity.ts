import { ISocialNetworks } from 'src/common/interfaces/profile';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 50 })
  username: string;

  @Column({ type: 'text', length: 100 })
  country: string;

  @Column('varchar', { length: 50 })
  profileImg: string;

  @Column('varchar', { array: true })
  socialNetworks: string[];

  @Column('varchar', { length: 400 })
  description: string;

  @Column('varchar', { length: 60, array: true })
  contentTags: string[];

  @Column('date', { nullable: true })
  birthDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
