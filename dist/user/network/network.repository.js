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
exports.NetworkRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
let NetworkRepository = class NetworkRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.Network, dataSource.createEntityManager());
    }
    async createAndSave(createNetworkInput, queryRunner) {
        const newNetwork = this.create(createNetworkInput);
        const queryResult = await this.createQueryBuilder('network-createAndSave', queryRunner)
            .insert()
            .values(newNetwork)
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
    async findById(id, queryRunner) {
        const queryResult = await this.createQueryBuilder('network', queryRunner)
            .where({ id })
            .getOne();
        return queryResult;
    }
    async findByUserId(userId, filter, queryRunner) {
        const { integrated } = filter;
        let queryBuilder = this.createQueryBuilder('user');
        queryBuilder = queryBuilder.where({
            userId
        });
        if (integrated !== undefined) {
            queryBuilder = queryBuilder.andWhere({
                integrated
            });
        }
        const queryResult = await queryBuilder.getMany();
        return queryResult;
    }
    async deleteNetwork(id, queryRunner) {
        const queryResult = await this.createQueryBuilder()
            .delete()
            .where({
            id
        })
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
};
NetworkRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], NetworkRepository);
exports.NetworkRepository = NetworkRepository;
//# sourceMappingURL=network.repository.js.map