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

@Entity('connection')
@Unique(['advertiserUserId', 'creatorUserId'])
export class Connection extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  advertiserUserId: number;

  @Column({ type: 'int' })
  creatorUserId: number;

  @Column({ type: 'varchar', nullable: true })
  message: string;

  @Column({ type: 'varchar' })
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'advertiserUserId', referencedColumnName: 'id' })
  advertiserUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorUserId', referencedColumnName: 'id' })
  creatorUser: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
