import { BaseEntity } from 'typeorm';
import { Integration } from './integration.entity';
export declare class Credential extends BaseEntity {
    id: number;
    integrationId: number;
    accessToken: string;
    expiryDate: number;
    refreshToken: string;
    scope: string;
    idToken: string;
    createdAt: Date;
    updatedAt: Date;
    integration: Integration;
}
