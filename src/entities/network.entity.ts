import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Unique
} from 'typeorm';
import { User } from './user.entity';
import { PlatformType } from 'src/common/constants/types/platform.type';
import { Platforms } from 'src/common/constants/enums';
import { Integration } from './integration.entity';
@Unique(['userId', 'url'])
@Entity('network')
export class Network extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'enum', enum: Platforms })
  platform: PlatformType;

  @Column({ type: 'boolean', default: false })
  integrated: boolean;

  @Column('varchar', { length: 150 })
  url: string;

  @Column('varchar', { length: 24, nullable: true })
  channelId?: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 200, nullable: true })
  profileImg: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Integration, (integration) => integration.network)
  integration: Integration;
}
