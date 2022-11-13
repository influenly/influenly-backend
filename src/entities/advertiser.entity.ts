import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  @Entity('advertiser')
  export class Advertiser extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 100 })
    username: string;
  
    @Column({ type: 'varchar', length: 120 })
    email: string;
  
    @Column({ type: 'varchar', length: 100 })
    password: string;
  
    @Column({ type: 'text'})
    country: string;
  
    @Column({ type: 'varchar' })
    profileImage: string;
  
    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'int' })
    credits: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  }
  