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
import { User } from './user.entity';

@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  conversationId: number;

  @Column({ type: 'int' })
  senderUserId: number;

  @Column({ type: 'int' })
  receiverUserId: number;

  @Column({ type: 'varchar' })
  content: string;

  @OneToOne(() => Conversation)
  @JoinColumn({ name: 'conversationId', referencedColumnName: 'id' })
  connection: Conversation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderUserId', referencedColumnName: 'id' })
  senderUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiverUserId', referencedColumnName: 'id' })
  receiverUser: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
