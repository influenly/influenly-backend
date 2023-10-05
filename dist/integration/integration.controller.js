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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../auth/decorators");
const constants_1 = require("../common/constants");
const entities_1 = require("../entities");
const dto_1 = require("./dto");
const integration_service_1 = require("./integration.service");
let IntegrationController = class IntegrationController {
    constructor(integrationService) {
        this.integrationService = integrationService;
    }
    async createIntegration(user, createIntegrationDto) {
        try {
            const createdIntegrationResult = await this.integrationService.createIntegration(user.id, createIntegrationDto);
            return createdIntegrationResult;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User,
        dto_1.CreateIntegrationDto]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "createIntegration", null);
IntegrationController = __decorate([
    (0, decorators_1.Auth)({ type: constants_1.UserTypes.CREATOR }),
    (0, swagger_1.ApiTags)('integration'),
    (0, common_1.Controller)('integration'),
    __metadata("design:paramtypes", [integration_service_1.IntegrationService])
], IntegrationController);
exports.IntegrationController = IntegrationController;
//# sourceMappingURL=integration.controller.js.map