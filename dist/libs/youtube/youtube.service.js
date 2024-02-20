"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
const rxjs_1 = require("rxjs");
let YoutubeService = class YoutubeService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        const { clientId, clientSecret } = configService.get('google');
        this.oAuth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret, 'http://localhost:4200');
    }
    async getToken(authorizationCode) {
        const { tokens } = await this.oAuth2Client.getToken(authorizationCode);
        return tokens;
    }
    async getChannelInfo(accessToken, integrationId) {
        const service = googleapis_1.google.youtube('v3');
        const oAuth2Client = this.oAuth2Client;
        oAuth2Client.setCredentials({
            access_token: accessToken
        });
        const { data: { items } } = await service.channels.list({
            auth: oAuth2Client,
            part: ['snippet,statistics,id'],
            mine: true
        });
        const channelInfo = items[0];
        return {
            id: channelInfo.id,
            name: channelInfo.snippet.title,
            profileImg: channelInfo.snippet.thumbnails.default.url,
            totalSubs: channelInfo.statistics.subscriberCount,
            totalVideos: channelInfo.statistics.videoCount,
            integrationId
        };
    }
    async getChannelInfoFromUrl(url) {
        return (0, rxjs_1.firstValueFrom)(this.httpService.get(url).pipe((0, rxjs_1.map)((response) => {
            try {
                const { data } = response;
                const regexChannelId = /"channelId":"([^"]+)"/;
                const channelId = data.match(regexChannelId)[1];
                const regexChannelName = /<meta\s+property="og:title"\s+content="([^"]+)">/;
                const channelName = data.match(regexChannelName)[1];
                return {
                    id: channelId,
                    name: channelName
                };
            }
            catch (error) {
                common_1.Logger.log(error);
                return 'NOT FOUND';
            }
        })));
    }
    async getMonthlyAA() {
        const service = googleapis_1.google.youtubeAnalytics('v2');
        const result = await service.reports.query({
            auth: this.oAuth2Client,
            startDate: '2023-01-01',
            endDate: '2024-01-01',
            ids: 'channel==MINE',
            metrics: 'views,comments,likes,averageViewDuration',
            dimensions: 'month'
        });
        return result.data;
    }
};
YoutubeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], YoutubeService);
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube.service.js.map