import { Platform } from 'src/common/constants/types/platform';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('integration')
export class Integration extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  plaftorm: Platform;

  @Column({ type: 'varchar' })
  accessToken!: string;

  @Column({ type: 'int' })
  tokenExpiresIn?: number;

  @Column({ type: 'varchar' })
  refreshToken?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
