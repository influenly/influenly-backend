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
exports.ConversationRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
let ConversationRepository = class ConversationRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.Conversation, dataSource.createEntityManager());
    }
    async findByUserId(userId, field, queryRunner) {
        const userType = field === 'creatorUserId' ? 'advertiserUser' : 'creatorUser';
        const queryResult = await this.createQueryBuilder('conversation')
            .leftJoinAndSelect(`conversation.${userType}`, 'user')
            .leftJoinAndSelect('user.profile', 'profile')
            .select([
            'conversation.id',
            'conversation.advertiserUserId',
            'conversation.creatorUserId',
            'conversation.status',
            'user.id',
            'profile.username',
            'profile.profileImg'
        ])
            .where(`conversation.${field} = :userId`, { userId })
            .getMany();
        console.log(queryResult);
        return queryResult;
    }
    async createAndSave(createConversationInput, queryRunner) {
        const newConversation = this.create(createConversationInput);
        const queryResult = await this.createQueryBuilder('conversation-createAndSave', queryRunner)
            .insert()
            .values(newConversation)
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
    async updateById(id, updateConversationInput, queryRunner) {
        console.log(updateConversationInput);
        const queryResult = await this.createQueryBuilder('conversation-updateById', queryRunner)
            .update(updateConversationInput)
            .where({
            id
        })
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
};
ConversationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ConversationRepository);
exports.ConversationRepository = ConversationRepository;
//# sourceMappingURL=conversation.repository.js.map