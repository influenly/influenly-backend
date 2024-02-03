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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.User, dataSource.createEntityManager());
    }
    async createAndSave(createUserInput, queryRunner) {
        const newUser = this.create(createUserInput);
        const queryResult = await this.createQueryBuilder('user-createAndSave', queryRunner)
            .insert()
            .values(newUser)
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
    async findAllCreators(filter, queryRunner) {
        const { contentTagsArr } = filter;
        let queryBuilder = this.createQueryBuilder('user');
        if (contentTagsArr && contentTagsArr.length) {
            queryBuilder = queryBuilder.andWhere('user.content_tags && :contentTagsArr', {
                contentTagsArr
            });
            if (contentTagsArr.length > 1) {
                queryBuilder = queryBuilder.addOrderBy(`array_length(ARRAY(SELECT unnest(user.content_tags) INTERSECT :contentTagsArr), 1)`, 'DESC');
            }
        }
        const queryResult = await queryBuilder.getMany();
        return queryResult;
    }
    async findById(id, queryRunner) {
        const queryResult = await this.createQueryBuilder('findById', queryRunner)
            .where({ id })
            .getOne();
        return queryResult;
    }
    async findByEmail(email, queryRunner) {
        const queryResult = await this.createQueryBuilder('findByEmail', queryRunner)
            .where({ email })
            .getOne();
        return queryResult;
    }
    async updateById(id, updateUserInput, queryRunner) {
        const queryResult = await this.createQueryBuilder('updateById', queryRunner)
            .update(updateUserInput)
            .where({
            id
        })
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map