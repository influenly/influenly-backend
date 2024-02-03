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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message/message.service");
const conversation_service_1 = require("./conversation/conversation.service");
const constants_1 = require("../common/constants");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("typeorm");
const enums_1 = require("../common/constants/enums");
let ChatService = class ChatService {
    constructor(messageService, conversationService, userService, dataSource) {
        this.messageService = messageService;
        this.conversationService = conversationService;
        this.userService = userService;
        this.dataSource = dataSource;
    }
    async createMessage(createMessageInput) {
        const newMessage = await this.messageService.create(createMessageInput);
        common_1.Logger.log(`Message id ${newMessage} created`);
    }
    async createConversation(createConversationInput) {
        const targetUser = await this.userService.getUserById(createConversationInput.creatorUserId);
        if (targetUser.type !== constants_1.UserTypes.CREATOR) {
            throw new Error('Invalid creator user id');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newConversation = Object.assign(Object.assign({}, createConversationInput), { status: enums_1.ConversationTypes.INIT_APPROVAL_PENDING });
            const createdConversation = await this.conversationService.create(newConversation, queryRunner);
            const newMessage = {
                conversationId: createdConversation.id,
                senderUserId: createConversationInput.advertiserUserId,
                content: createConversationInput.message,
                type: enums_1.MessageTypes.INITIALIZER
            };
            const createdMessage = await this.messageService.create(newMessage, queryRunner);
            await queryRunner.commitTransaction();
            console.log(createdMessage);
            return createdConversation;
        }
        catch (err) {
            common_1.Logger.error(`Conversation and initial message creation has failed.`);
            await queryRunner.rollbackTransaction();
            throw new Error(err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async getConversationsByUserId(userId, type) {
        const fieldToSearchFor = type === constants_1.UserTypes.CREATOR ? 'creatorUserId' : 'advertiserUserId';
        const conversations = await this.conversationService.getAllByUserId(userId, fieldToSearchFor);
        return conversations;
    }
    async getMessagesByConversationId(conversationId) {
        const messages = await this.messageService.getByConversationId(conversationId);
        return messages;
    }
    async updateById(conversationId, { status }) {
        const updatedConversation = await this.conversationService.updateById(conversationId, { status });
        return updatedConversation;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        conversation_service_1.ConversationService,
        user_service_1.UserService,
        typeorm_1.DataSource])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map