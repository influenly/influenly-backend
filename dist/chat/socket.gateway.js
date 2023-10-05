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
var SocketGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const socket_auth_middleware_1 = require("../middlewares/socket-auth.middleware");
const send_message_event_dto_1 = require("./dto/send-message-event.dto");
const common_1 = require("@nestjs/common");
let SocketGateway = SocketGateway_1 = class SocketGateway {
    constructor(chatService, jwtService, userService) {
        this.chatService = chatService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async handleSendMessage(client, sendMessageEventBody) {
        this.server.emit(`recMessage-${sendMessageEventBody.receiverUserId}`, sendMessageEventBody);
        await this.chatService.createMessage(Object.assign(Object.assign({}, sendMessageEventBody), { senderUserId: client.user.id }));
    }
    afterInit(server) {
        const middle = (0, socket_auth_middleware_1.WSAuthMiddleware)(this.jwtService, this.userService);
        server.use(middle);
        common_1.Logger.log(`WS ${SocketGateway_1.name} init`);
    }
    handleDisconnect(client) {
        common_1.Logger.log('client disconnect', client.id);
    }
    handleConnection(client, ...args) {
        common_1.Logger.log(`user id ${client.user.id} connected - client id ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_message_event_dto_1.SendMessageEventDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleSendMessage", null);
SocketGateway = SocketGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)(3001, {
        cors: {
            origin: '*'
        }
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        jwt_1.JwtService,
        user_service_1.UserService])
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map