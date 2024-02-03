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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const dto_1 = require("./dto");
const decorators_1 = require("../auth/decorators");
const entities_1 = require("../entities");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async completeOnboarding(user, completeOnboardingDto) {
        try {
            const completeOnboardingResult = await this.userService.completeOnboarding(user, completeOnboardingDto);
            return {
                ok: true,
                user: Object.assign(Object.assign({}, completeOnboardingResult.updatedUser), { networks: completeOnboardingResult.networks })
            };
        }
        catch (error) {
            throw new common_1.HttpException({ ok: false, error: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUser(userId) {
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }
            return {
                ok: true,
                user
            };
        }
        catch (error) {
            throw new common_1.HttpException({ ok: false, error: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUser(user, updateUserDto) {
        try {
            const updatedUserResult = await this.userService.updateById(user, updateUserDto);
            return {
                ok: true,
                user: Object.assign(Object.assign({}, updatedUserResult.user), { networks: updatedUserResult.networks })
            };
        }
        catch (error) {
            throw new common_1.HttpException({ ok: false, error: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserProfile({ onboardingCompleted }, userId) {
        try {
            if (!onboardingCompleted)
                throw new Error(`User with id ${userId} has not completed the onboarding`);
            const profileResult = await this.userService.getProfileByUserId(userId);
            if (!profileResult) {
                throw new Error(`User with id ${userId} not found`);
            }
            return {
                ok: true,
                user: Object.assign(Object.assign({}, profileResult.user), { networks: profileResult.networks })
            };
        }
        catch (error) {
            throw new common_1.HttpException({ ok: false, error: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getCreators(user, followersRange, contentTags) {
        try {
            let minFollowers, maxFollowers, contentTagsArr;
            if (followersRange) {
                let [min, max] = followersRange.split('-');
                minFollowers = parseInt(min);
                maxFollowers = max === '*' ? undefined : parseInt(max);
            }
            if (contentTags) {
                contentTagsArr = contentTags.split(';');
            }
            const filters = {
                minFollowers,
                maxFollowers,
                contentTagsArr
            };
            const creatorsResult = await this.userService.getCreators(filters);
            return {
                ok: true,
                data: creatorsResult
            };
        }
        catch (error) {
            throw new common_1.HttpException({ ok: false, error: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('/onboarding'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User,
        dto_1.CompleteOnboardingDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "completeOnboarding", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User,
        dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)(':id/profile'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('creator'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Query)('followers_range')),
    __param(2, (0, common_1.Query)('content_tags')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCreators", null);
UserController = __decorate([
    (0, decorators_1.Auth)(),
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map