import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { UserRoles, UserType } from 'src/common/constants';
import { Network } from './network.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 120 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 80 })
  country: string;

  @Column({ type: 'boolean', default: false })
  onboardingCompleted: boolean;

  @Column({ type: 'text', default: UserRoles.REGULAR })
  role: string;

  @Column({ type: 'varchar', length: 20 })
  type: UserType;

  @Column('varchar', { unique: true, length: 50, nullable: true })
  username: string;

  @Column('varchar', { length: 50, nullable: true })
  profileImg: string;

  @Column('varchar', { length: 400, nullable: true })
  description: string;

  @Column('varchar', { length: 60, array: true, nullable: true })
  contentTags: string[];

  @Column('date', { nullable: true })
  birthDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Network, (network) => network.user)
  networks: Network[];
}
