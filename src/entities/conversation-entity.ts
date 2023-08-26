import {
  BaseEntity,
  Column,
  JoinColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm';
import { User } from './user.entity';

@Entity('conversation')
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  advertiserUserId: number;

  @Column({ type: 'int' })
  creatorUserId: number;

  @Column({ type: 'varchar' })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  advertiserUser: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  creatorUser: User;
}
