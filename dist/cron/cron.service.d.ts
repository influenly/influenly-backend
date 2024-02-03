import { AnalyticsService } from '../analytics/analytics.service';
import { CredentialService } from '../integration/credential/credential.service';
import { YoutubeService } from '../libs/youtube/youtube.service';
export declare class CronService {
    private readonly analyticsService;
    private readonly youtubeService;
    private readonly credentialService;
    constructor(analyticsService: AnalyticsService, youtubeService: YoutubeService, credentialService: CredentialService);
    updateBAYoutube(): Promise<void>;
    updateAAYoutube(): Promise<void>;
}
