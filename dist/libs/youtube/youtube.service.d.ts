import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Credentials } from 'google-auth-library';
export declare class YoutubeService {
    private readonly configService;
    private readonly httpService;
    private oAuth2Client;
    constructor(configService: ConfigService, httpService: HttpService);
    getToken(authorizationCode: string): Promise<Credentials>;
    getChannelInfo(accessToken: string): Promise<{
        id: string;
        name: string;
        profileImg: string;
        totalSubs: string;
        totalVideos: string;
    }>;
    getChannelInfoFromUrl(url: string): Promise<{
        id: string;
        name: string;
        profileImg: string;
    }>;
}
