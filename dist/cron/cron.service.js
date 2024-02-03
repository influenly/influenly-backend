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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const analytics_service_1 = require("../analytics/analytics.service");
const credential_service_1 = require("../integration/credential/credential.service");
const youtube_service_1 = require("../libs/youtube/youtube.service");
let CronService = class CronService {
    constructor(analyticsService, youtubeService, credentialService) {
        this.analyticsService = analyticsService;
        this.youtubeService = youtubeService;
        this.credentialService = credentialService;
    }
    async updateBAYoutube() {
        try {
            const credentials = await this.credentialService.getAll();
            const channelInfoPromises = credentials.map((credential) => {
                const { accessToken, integrationId } = credential;
                return this.youtubeService.getChannelInfo(accessToken, integrationId);
            });
            const channelInfoResults = await Promise.all(channelInfoPromises);
            for (const channelInfo of channelInfoResults) {
                const { integrationId, name, profileImg, totalSubs, totalVideos } = channelInfo;
                await this.analyticsService.updateBAByIntegrationId(integrationId, {
                    totalSubs: parseInt(totalSubs),
                    totalVideos: parseInt(totalVideos),
                    name,
                    profileImg
                });
            }
            console.log('Actualización exitosa de YouTube Analytics.');
        }
        catch (error) {
            console.error('Error al actualizar YouTube Analytics:', error);
        }
    }
    async updateAAYoutube() {
        try {
            const credentials = await this.credentialService.getAll();
            const channelInfoPromises = credentials.map((credential) => {
                const { accessToken, integrationId } = credential;
                return this.youtubeService.getChannelInfo(accessToken, integrationId);
            });
            const channelInfoResults = await Promise.all(channelInfoPromises);
            for (const channelInfo of channelInfoResults) {
                const { integrationId, name, profileImg, totalSubs, totalVideos } = channelInfo;
                await this.analyticsService.updateBAByIntegrationId(integrationId, {
                    totalSubs: parseInt(totalSubs),
                    totalVideos: parseInt(totalVideos),
                    name,
                    profileImg
                });
            }
            console.log('Actualización exitosa de YouTube Analytics.');
        }
        catch (error) {
            console.error('Error al actualizar YouTube Analytics:', error);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "updateBAYoutube", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "updateAAYoutube", null);
CronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService,
        youtube_service_1.YoutubeService,
        credential_service_1.CredentialService])
], CronService);
exports.CronService = CronService;
//# sourceMappingURL=cron.service.js.map