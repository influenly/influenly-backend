"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronModule = void 0;
const common_1 = require("@nestjs/common");
const cron_service_1 = require("./cron.service");
const analytics_module_1 = require("../analytics/analytics.module");
const integration_module_1 = require("../integration/integration.module");
const credential_service_1 = require("../integration/credential/credential.service");
const analytics_service_1 = require("../analytics/analytics.service");
const youtube_service_1 = require("../libs/youtube/youtube.service");
let CronModule = class CronModule {
};
CronModule = __decorate([
    (0, common_1.Module)({
        imports: [analytics_module_1.AnalyticsModule, integration_module_1.IntegrationModule],
        providers: [cron_service_1.CronService, credential_service_1.CredentialService, analytics_service_1.AnalyticsService, youtube_service_1.YoutubeService]
    })
], CronModule);
exports.CronModule = CronModule;
//# sourceMappingURL=cron.module.js.map