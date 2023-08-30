import {
  BaseEntity,
  Column,
  JoinColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique
} from 'typeorm';
import { User } from './user.entity';

@Unique(['advertiserUserId', 'creatorUserId'])
@Entity('conversation')
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  advertiserUserId: number;

  @Column({ type: 'int' })
  creatorUserId: number;

  @Column({ type: 'varchar' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'advertiserUserId' })
  advertiserUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorUserId' })
  creatorUser: User;
}
