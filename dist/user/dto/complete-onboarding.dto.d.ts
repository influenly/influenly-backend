import { INetworks } from 'src/common/interfaces';
export declare class CompleteOnboardingDto {
    description: string;
    birthDate?: string;
    networks: INetworks;
    networkIntegratedId: number;
    username: string;
    contentTags: string[];
}
