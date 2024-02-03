import { BaseEntity } from 'typeorm';
import { Integration } from './integration.entity';
export declare class AnalyticsYoutube extends BaseEntity {
    id: number;
    integrationId: number;
    totalSubs: number;
    totalVideos: number;
    createdAt: Date;
    updatedAt: Date;
    integration: Integration;
}
