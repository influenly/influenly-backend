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
import { Connection } from './connection.entity';

@Entity('conversation')
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  connectionId: number;

  @OneToOne(() => Connection)
  @JoinColumn({ name: 'connectionId', referencedColumnName: 'id' })
  connection: Connection;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
