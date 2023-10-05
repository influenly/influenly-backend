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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const analytics_module_1 = require("./analytics/analytics.module");
const integration_module_1 = require("./integration/integration.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const app_1 = require("./config/app");
const database_1 = require("./config/database");
const google_1 = require("./config/google");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const chat_module_1 = require("./chat/chat.module");
let AppModule = AppModule_1 = class AppModule {
    constructor(configService) {
        const { api: { port: apiPort } } = configService.get('app');
        AppModule_1.port = apiPort;
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [app_1.default, database_1.default, google_1.default],
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const { host, port, username, password, database } = configService.get('database');
                    return {
                        type: 'postgres',
                        host,
                        port,
                        username,
                        password,
                        database,
                        entities: entities_1.default,
                        migrationsRun: false,
                        logging: true,
                        migrationsTableName: 'migration',
                        migrations: [
                            __dirname + '/migration/**/*.ts',
                            __dirname + '/migration/**/*.js'
                        ],
                        synchronize: true,
                        cli: {
                            migrationsDir: 'src/migration'
                        }
                    };
                },
                inject: [config_1.ConfigService]
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10
            }),
            analytics_module_1.AnalyticsModule,
            integration_module_1.IntegrationModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            chat_module_1.ChatModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ]
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map