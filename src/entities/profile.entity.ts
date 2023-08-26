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
import { User } from './user.entity';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column('varchar', { unique: true, length: 50 })
  username: string;

  @Column('varchar', { length: 50, nullable: true })
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

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
