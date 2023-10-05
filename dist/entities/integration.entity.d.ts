import { BaseEntity } from 'typeorm';
import { Network } from './network.entity';
export declare class Integration extends BaseEntity {
    id: number;
    networkId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    network: Network;
}
