import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Credentials } from 'google-auth-library';
export declare class YoutubeService {
    private readonly configService;
    private readonly httpService;
    private oAuth2Client;
    constructor(configService: ConfigService, httpService: HttpService);
    getToken(authorizationCode: string): Promise<Credentials>;
    getChannelInfo(accessToken: string, integrationId?: number): Promise<{
        id: string;
        name: string;
        profileImg: string;
        totalSubs: string;
        totalVideos: string;
        integrationId: number;
    }>;
    getChannelInfoFromUrl(url: string): Promise<"NOT FOUND" | {
        id: string;
        name: string;
    }>;
    getMonthlyAA(): Promise<import("googleapis").youtubeAnalytics_v2.Schema$QueryResponse>;
}
