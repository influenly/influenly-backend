import { INetworks } from 'src/common/interfaces';
export declare class UpdateProfileDto {
    description?: string;
    birthDate?: string;
    networks?: INetworks;
    username?: string;
    contentTags?: string[];
}
