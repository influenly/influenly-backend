"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const chat_service_1 = require("./chat.service");
const message_service_1 = require("./message/message.service");
const message_repository_1 = require("./message/message.repository");
const conversation_repository_1 = require("./conversation/conversation.repository");
const conversation_service_1 = require("./conversation/conversation.service");
const socket_gateway_1 = require("./socket.gateway");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const chat_controller_1 = require("./chat.controller");
const auth_module_1 = require("../auth/auth.module");
const network_service_1 = require("../user/network/network.service");
const network_repository_1 = require("../user/network/network.repository");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const axios_1 = require("@nestjs/axios");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([entities_1.Conversation, entities_1.Message])
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [
            socket_gateway_1.SocketGateway,
            chat_service_1.ChatService,
            user_service_1.UserService,
            network_service_1.NetworkService,
            network_repository_1.NetworkRepository,
            message_service_1.MessageService,
            message_repository_1.MessageRepository,
            conversation_repository_1.ConversationRepository,
            conversation_service_1.ConversationService,
            youtube_service_1.YoutubeService
        ]
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map