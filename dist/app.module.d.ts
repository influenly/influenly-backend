import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppModule implements NestModule {
    static port: number;
    constructor(configService: ConfigService);
    configure(consumer: MiddlewareConsumer): void;
}
