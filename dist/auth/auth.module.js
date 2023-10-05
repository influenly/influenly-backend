"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt-strategy");
const network_service_1 = require("../user/network/network.service");
const network_repository_1 = require("../user/network/network.repository");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const axios_1 = require("@nestjs/axios");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            axios_1.HttpModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: '24h'
                        }
                    };
                }
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            user_service_1.UserService,
            network_service_1.NetworkService,
            network_repository_1.NetworkRepository,
            youtube_service_1.YoutubeService
        ],
        exports: [passport_1.PassportModule, jwt_strategy_1.JwtStrategy]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map