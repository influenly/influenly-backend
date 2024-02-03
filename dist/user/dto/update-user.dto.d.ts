import { INetworks } from 'src/common/interfaces';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    country?: string;
    description?: string;
    birthDate?: string;
    networks?: INetworks;
    username?: string;
    contentTags?: string[];
}
