import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  @Entity('youtubeTokenInfo')
  export class YoutubeTokenInfo extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar' })
    accessToken!: string;
  
    @Column({ type: 'int' })
    expireToken!: number;
  
    @Column({ type: 'varchar' })
    refreshToken!: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  }
  