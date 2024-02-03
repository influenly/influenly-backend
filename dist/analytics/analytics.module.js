"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const analytics_controller_1 = require("./analytics.controller");
const analytics_service_1 = require("./analytics.service");
const analytics_youtube_repository_1 = require("./analytics-youtube/analytics-youtube.repository");
const integration_module_1 = require("../integration/integration.module");
const integration_service_1 = require("../integration/integration.service");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const integration_repository_1 = require("../integration/integration.repository");
const credential_service_1 = require("../integration/credential/credential.service");
const credential_repository_1 = require("../integration/credential/credential.repository");
const network_service_1 = require("../user/network/network.service");
const network_repository_1 = require("../user/network/network.repository");
let AnalyticsModule = class AnalyticsModule {
};
AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.AnalyticsYoutube]),
            (0, common_1.forwardRef)(() => integration_module_1.IntegrationModule)
        ],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [
            analytics_service_1.AnalyticsService,
            integration_repository_1.IntegrationRepository,
            network_service_1.NetworkService,
            network_repository_1.NetworkRepository,
            credential_service_1.CredentialService,
            credential_repository_1.CredentialRepository,
            analytics_youtube_repository_1.AnalyticsYoutubeRepository,
            integration_service_1.IntegrationService,
            youtube_service_1.YoutubeService
        ],
        exports: [analytics_service_1.AnalyticsService, analytics_youtube_repository_1.AnalyticsYoutubeRepository, youtube_service_1.YoutubeService]
    })
], AnalyticsModule);
exports.AnalyticsModule = AnalyticsModule;
//# sourceMappingURL=analytics.module.js.map