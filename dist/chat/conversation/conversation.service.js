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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const conversation_repository_1 = require("./conversation.repository");
let ConversationService = class ConversationService {
    constructor(conversationRepository) {
        this.conversationRepository = conversationRepository;
    }
    async getAllByUserId(userId, fieldToSearchFor) {
        const conversations = await this.conversationRepository.findByUserId(userId, fieldToSearchFor);
        return conversations;
    }
    async create(conversation, queryRunner) {
        const newConversation = await this.conversationRepository.createAndSave(conversation, queryRunner);
        return newConversation;
    }
    async updateById(conversationId, { status }) {
        const updatedConversation = await this.conversationRepository.updateById(conversationId, {
            status
        });
        return updatedConversation;
    }
};
ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [conversation_repository_1.ConversationRepository])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map