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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../auth/decorators");
const constants_1 = require("../common/constants");
const entities_1 = require("../entities");
const create_conversation_dto_1 = require("./conversation/dto/create-conversation.dto");
const update_conversation_dto_1 = require("./conversation/dto/update-conversation.dto");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getConversationsByUserId({ id, type }) {
        try {
            const conversationsResult = await this.chatService.getConversationsByUserId(id, type);
            return conversationsResult;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getMessagesByConversationId(conversationId) {
        try {
            const messagesResult = await this.chatService.getMessagesByConversationId(conversationId);
            return messagesResult;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createConversation({ id }, createConversationDto) {
        try {
            const createdConversationResult = await this.chatService.createConversation(Object.assign(Object.assign({}, createConversationDto), { advertiserUserId: id }));
            return createdConversationResult;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateConversation(conversationId, updateConversationDto) {
        try {
            const updatedConversationResult = await this.chatService.updateById(conversationId, updateConversationDto);
            return updatedConversationResult;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('/conversation'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversationsByUserId", null);
__decorate([
    (0, common_1.Get)('/conversation/:id/message'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessagesByConversationId", null);
__decorate([
    (0, decorators_1.Auth)({ type: constants_1.UserTypes.ADVERTISER }),
    (0, common_1.Post)('/conversation'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User,
        create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Patch)('/conversation/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_conversation_dto_1.UpdateConversationDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "updateConversation", null);
ChatController = __decorate([
    (0, decorators_1.Auth)(),
    (0, swagger_1.ApiTags)('chat'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map