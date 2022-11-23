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

  @Column({ unique: true, type: 'varchar', length: 100 })
  userName: string;

  @Column({ unique: true, type: 'varchar', length: 120 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'text', nullable: true })
  profileImage: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  youtubeLinked: Boolean;

  @Column({ type: 'boolean', default: false })
  twitchLinked: Boolean;

  @Column({ type: 'boolean', default: false })
  emailConfirmed: Boolean;

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
