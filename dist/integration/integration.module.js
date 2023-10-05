"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const entities_1 = require("../entities");
const integration_controller_1 = require("./integration.controller");
const integration_service_1 = require("./integration.service");
const integration_repository_1 = require("./integration.repository");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const credential_service_1 = require("./credential/credential.service");
const credential_repository_1 = require("./credential/credential.repository");
const axios_1 = require("@nestjs/axios");
const user_module_1 = require("../user/user.module");
const network_service_1 = require("../user/network/network.service");
const network_repository_1 = require("../user/network/network.repository");
const analytics_service_1 = require("../analytics/analytics.service");
const analytics_youtube_repository_1 = require("../analytics/analytics-youtube/analytics-youtube.repository");
let IntegrationModule = class IntegrationModule {
};
IntegrationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Integration]), axios_1.HttpModule, auth_module_1.AuthModule, user_module_1.UserModule],
        controllers: [integration_controller_1.IntegrationController],
        providers: [
            analytics_service_1.AnalyticsService,
            analytics_youtube_repository_1.AnalyticsYoutubeRepository,
            integration_service_1.IntegrationService,
            integration_repository_1.IntegrationRepository,
            network_service_1.NetworkService,
            network_repository_1.NetworkRepository,
            youtube_service_1.YoutubeService,
            credential_service_1.CredentialService,
            credential_repository_1.CredentialRepository
        ],
        exports: [
            integration_service_1.IntegrationService,
            integration_repository_1.IntegrationRepository,
            credential_service_1.CredentialService,
            auth_module_1.AuthModule
        ]
    })
], IntegrationModule);
exports.IntegrationModule = IntegrationModule;
//# sourceMappingURL=integration.module.js.map