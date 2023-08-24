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
import { Analytics, Profile } from 'src/entities';
import { UserRoles, UserType } from 'src/common/constants';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true, unique: true })
  profileId: number;

  @Column({ type: 'int', nullable: true, unique: true })
  analyticsId: number;

  @Column({ unique: true, type: 'varchar', length: 120 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean', default: false })
  onboardingCompleted: boolean;

  @Column({ type: 'text', default: UserRoles.REGULAR })
  role: string;

  @Column({ type: 'varchar', length: 20 })
  type: UserType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Analytics)
  @JoinColumn({ name: 'analyticsId' })
  analytics: Analytics;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profileId' })
  profile: Profile;
}
