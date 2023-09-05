import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany
} from 'typeorm';
import { UserRoles, UserType } from 'src/common/constants';
import { Profile } from './profile.entity';
import { Conversation } from './conversation-entity';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  // @OneToMany(() => Conversation, (conversation) => conversation.creatorUser)
  // conversations: Conversation[];

  // @OneToMany(() => Conversation, (conversation) => conversation.advertiserUser)
  // conversations: Conversation[];
}
