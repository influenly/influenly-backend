"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSAuthMiddleware = void 0;
const WSAuthMiddleware = (jwtService, userService) => {
    return async (socket, next) => {
        var _a;
        try {
            const jwtPayload = jwtService.verify((_a = socket.handshake.headers.authorization) !== null && _a !== void 0 ? _a : '');
            const user = await userService.getUserById(jwtPayload.userId);
            if (user) {
                socket.user = user;
                next();
            }
            else {
                next({
                    name: 'Unauthorizaed',
                    message: 'Unauthorizaed'
                });
            }
        }
        catch (error) {
            next({
                name: 'Unauthorizaed',
                message: 'Unauthorizaed'
            });
        }
    };
};
exports.WSAuthMiddleware = WSAuthMiddleware;
//# sourceMappingURL=socket-auth.middleware.js.map