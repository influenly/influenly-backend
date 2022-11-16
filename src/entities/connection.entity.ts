import {
  BaseEntity,
  Column,
  JoinColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { Advertiser } from './advertiser.entity';
import { Creator } from './creator.entity';

@Entity('connection')
export class Connection extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  creatorId!: number;

  @Column({ type: 'int' })
  advertiserId!: number;

  @ManyToOne(() => Creator, (creator) => creator.connections)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator!: Creator;

  @ManyToOne(() => Advertiser, (advertiser) => advertiser.connections)
  @JoinColumn({ name: 'advertiserId', referencedColumnName: 'id' })
  advertiser!: Advertiser;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
