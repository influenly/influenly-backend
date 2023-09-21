import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { PlatformType } from 'src/common/constants/types/platform.type';
import { Platforms } from 'src/common/constants/enums';
@Unique(['userId', 'url'])
@Entity('network')
export class Network extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'enum', enum: Platforms })
  platform: PlatformType;

  @Column('varchar', { length: 150 })
  url: string;

  @Column('varchar', { length: 24, nullable: true })
  channelId: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 200 })
  profileImg: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
function Unique(
  arg0: string[]
): (target: typeof Network) => void | typeof Network {
  throw new Error('Function not implemented.');
}
