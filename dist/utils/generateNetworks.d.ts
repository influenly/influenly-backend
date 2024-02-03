import { Platforms } from 'src/common/constants/enums';
import { INetworks } from 'src/common/interfaces';
import { Network } from 'src/entities';
export declare const networksGenerator: (networksInput: INetworks, userId: number) => Partial<Network>[];
export declare const youtubeNetworksGenerator: (youtubeChannelsInfo: any, integratedNetwork: Network) => {
    channelId: string;
    name: string;
    userId: number;
    url: string;
    platform: Platforms.YOUTUBE;
}[];
