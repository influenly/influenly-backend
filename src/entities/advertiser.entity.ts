import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Connection } from './connection.entity';
import { Contract } from './contract.entity';

@Entity('advertiser')
export class Advertiser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 100 })
  userName: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ unique: true, type: 'varchar', length: 120 })
  email: string;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  validated: Boolean;

  @Column({ type: 'int', default: 10 })
  credits: number;

  @OneToMany(() => Connection, (connection) => connection.advertiser)
  connections!: Connection[];

  @OneToMany(() => Contract, (contract) => contract.advertiser)
  contracts!: Contract[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
