import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Integration } from './integration.entity';

@Entity('credential')
export class Credential extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int', { unique: true })
  integrationId: number;

  @Column({ type: 'varchar' })
  accessToken: string;

  @Column({ type: 'bigint' })
  expiryDate: number;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @Column({ type: 'varchar' })
  scope: string;

  @Column({ type: 'varchar', nullable: true })
  idToken: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @OneToOne(() => Integration)
  @JoinColumn({ name: 'integrationId' })
  integration: Integration;
}
