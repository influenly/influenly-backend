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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const analytics_youtube_repository_1 = require("./analytics-youtube/analytics-youtube.repository");
let AnalyticsService = class AnalyticsService {
    constructor(analyticsYoutubeRepository) {
        this.analyticsYoutubeRepository = analyticsYoutubeRepository;
    }
    async createBA(createBAYoutubeInput, queryRunner) {
        const createdBAYoutube = await this.analyticsYoutubeRepository.createAndSave(createBAYoutubeInput, queryRunner);
        return createdBAYoutube;
    }
    async updateBAByIntegrationId(integrationId, updateBAYoutubeInput, queryRunner) {
        const updatedBAYoutube = await this.analyticsYoutubeRepository.updateByIntegrationId(integrationId, updateBAYoutubeInput, queryRunner);
        return updatedBAYoutube;
    }
    async getBAByUserId(userId, queryRunner) {
        const analyticsYoutube = await this.analyticsYoutubeRepository.findByUserId(userId, queryRunner);
        return analyticsYoutube;
    }
    async getBAByIntegrationId(integrationId, queryRunner) {
        const analyticsYoutube = await this.analyticsYoutubeRepository.findByIntegrationId(integrationId, queryRunner);
        return analyticsYoutube;
    }
};
AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [analytics_youtube_repository_1.AnalyticsYoutubeRepository])
], AnalyticsService);
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map