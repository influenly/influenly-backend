import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const origin = request.get('origin');

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(
        `method:${method} path:${baseUrl} statusCode:${statusCode} origin:${origin} userAgent:${userAgent} ip:${ip}`
      );
    });

    next();
  }
}
