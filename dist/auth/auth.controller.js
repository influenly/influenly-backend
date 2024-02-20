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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signUpRequestDto) {
        try {
            const signUpResult = await this.authService.signUp(signUpRequestDto);
            common_1.Logger.log(`User ${signUpResult.user.email} created succesfully. Type: ${signUpResult.user.type}`);
            return {
                ok: true,
                user: signUpResult.user,
                token: signUpResult.token
            };
        }
        catch (error) {
            throw new common_1.HttpException({ ok: false, error: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signIn(signInRequestDto) {
        try {
            const signInResult = await this.authService.signIn(signInRequestDto);
            return {
                ok: true,
                user: signInResult.user,
                token: signInResult.token
            };
        }
        catch (error) {
            throw new common_1.HttpException({ ok: false, error: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignUpRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map