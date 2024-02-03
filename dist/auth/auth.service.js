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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwService) {
        this.userService = userService;
        this.jwService = jwService;
    }
    async signUp(signUpRequestDto) {
        const { type, password, email } = signUpRequestDto;
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            signUpRequestDto = Object.assign(Object.assign({}, signUpRequestDto), { password: hashedPassword });
            const newUser = await this.userService.create(signUpRequestDto);
            const { id: userId } = newUser;
            const token = this.getJwtToken({ userId, userType: type });
            return {
                user: newUser,
                token
            };
        }
        catch (error) {
            common_1.Logger.error(`User signup transaction has failed. ${error.detail}`);
            const errorMessage = error.detail === `Key (email)=(${email}) already exists.`
                ? "EMAIL_ALREADY_EXISTS"
                : error.message;
            throw new Error(errorMessage);
        }
    }
    async signIn(signInRequestDto) {
        try {
            const { email, password } = signInRequestDto;
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new Error("INVALID_EMAIL");
            }
            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("INVALID_PASSWORD");
            }
            const { type: userType, id: userId } = user;
            const token = this.getJwtToken({ userId, userType });
            delete user.password;
            return {
                user,
                token
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    getJwtToken(payload) {
        return this.jwService.sign(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map