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
import { ConversationType } from 'src/common/constants/types';
import { ConversationTypes } from 'src/common/constants/enums';

@Unique(['advertiserUserId', 'creatorUserId'])
@Entity('conversation')
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  advertiserUserId: number;

  @Column({ type: 'int' })
  creatorUserId: number;

  @Column({ type: 'enum', enum: ConversationTypes })
  status: ConversationType;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'advertiserUserId' })
  advertiserUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorUserId' })
  creatorUser: User;
}
