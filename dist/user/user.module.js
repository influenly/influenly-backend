"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const user_controller_1 = require("./user.controller");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
const analytics_module_1 = require("../analytics/analytics.module");
const integration_module_1 = require("../integration/integration.module");
const integration_service_1 = require("../integration/integration.service");
const analytics_service_1 = require("../analytics/analytics.service");
const network_repository_1 = require("./network/network.repository");
const network_service_1 = require("./network/network.service");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const axios_1 = require("@nestjs/axios");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([entities_1.User]),
            (0, common_1.forwardRef)(() => analytics_module_1.AnalyticsModule),
            (0, common_1.forwardRef)(() => integration_module_1.IntegrationModule)
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            user_repository_1.UserRepository,
            network_service_1.NetworkService,
            network_repository_1.NetworkRepository,
            integration_service_1.IntegrationService,
            analytics_service_1.AnalyticsService,
            youtube_service_1.YoutubeService
        ],
        exports: [user_service_1.UserService, user_repository_1.UserRepository, analytics_service_1.AnalyticsService, integration_service_1.IntegrationService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map