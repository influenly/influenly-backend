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
const update_user_profile_dto_1 = require("./profile/dto/update-user-profile.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async completeOnboarding(user, completeOnboardingDto) {
        try {
            const { id, onboardingCompleted, type, country } = user;
            const completeOnboardingResult = await this.userService.completeOnboarding({ id, onboardingCompleted, type }, completeOnboardingDto);
            return Object.assign(Object.assign({}, completeOnboardingResult), { country });
        }
        catch (error) {
            throw new common_1.HttpException({ error: true, message: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUser(userId) {
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUser(user, updateUserDto) {
        try {
            const updatedUserResult = await this.userService.updateById(user.id, updateUserDto);
            return updatedUserResult;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUserProfile({ id, country }, updateProfileDto) {
        try {
            const updatedUserProfileResult = await this.userService.updateById(id, updateProfileDto);
            return Object.assign(Object.assign({}, updatedUserProfileResult), { country });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserProfile({ onboardingCompleted }, userId) {
        try {
            if (!onboardingCompleted)
                throw new Error(`User with id ${userId} has not completed the onboarding`);
            const fullProfile = await this.userService.getProfile(userId);
            if (!fullProfile) {
                throw new Error(`User with id ${userId} not found`);
            }
            return Object.assign({}, fullProfile);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
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
    (0, common_1.Patch)('/profile'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User,
        update_user_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserProfile", null);
__decorate([
    (0, common_1.Get)(':id/profile'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
UserController = __decorate([
    (0, decorators_1.Auth)(),
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map