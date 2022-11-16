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
import { Stage } from './stage.entity';

@Entity('contract')
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  creatorId!: number;

  @Column({ type: 'int' })
  advertiserId!: number;

  @Column({ type: 'int' })
  stageId!: number;

  @ManyToOne(() => Creator, (creator) => creator.contracts)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator!: Creator;

  @ManyToOne(() => Advertiser, (advertiser) => advertiser.contracts)
  @JoinColumn({ name: 'advertiserId', referencedColumnName: 'id' })
  advertiser!: Advertiser;

  @ManyToOne(() => Stage, (stage) => stage.contracts)
  @JoinColumn({ name: 'stageId', referencedColumnName: 'id' })
  stage!: Stage;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
