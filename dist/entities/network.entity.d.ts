import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { PlatformType } from 'src/common/constants/types/platform.type';
export declare class Network extends BaseEntity {
    id: number;
    userId: number;
    platform: PlatformType;
    integrated: boolean;
    url: string;
    channelId?: string;
    name: string;
    profileImg: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
