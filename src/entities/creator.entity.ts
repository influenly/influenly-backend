import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Analytics } from './analytics.entity';
import { Connection } from './connection.entity';
import { Contract } from './contract.entity';

@Entity('creator')
export class Creator extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  userName: string;

  @Column({ unique: true, type: 'varchar', length: 120 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  youtubeLinked: Boolean;

  @Column({ type: 'boolean', default: false })
  twitchLinked: Boolean;

  @OneToMany(() => Connection, (connection) => connection.creator)
  connections!: Connection[];

  @OneToMany(() => Contract, (contract) => contract.creator)
  contracts!: Contract[];

  @OneToMany(() => Analytics, (analytics) => analytics.creator)
  analytics!: Analytics[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
