import {
  BaseEntity,
  Column,
  JoinColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne
} from 'typeorm';
import { Conversation } from './conversation-entity';
import { UserType } from 'src/common/constants';
import { User } from './user.entity';

@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  conversationId: number;

  @Column({ type: 'int' })
  senderUserId: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'boolean' })
  initialMessage: boolean;

  @OneToOne(() => Conversation)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @OneToOne(() => User)
  @JoinColumn({ name: 'senderUserId' })
  senderUser: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
