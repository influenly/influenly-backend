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

@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  conversationId: number;

  @Column({ type: 'varchar' })
  senderUserType: UserType;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'boolean' })
  initial_message: boolean;

  @OneToOne(() => Conversation)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
