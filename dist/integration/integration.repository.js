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
exports.IntegrationRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
let IntegrationRepository = class IntegrationRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.Integration, dataSource.createEntityManager());
    }
    async createAndSave(createIntegrationInput, queryRunner) {
        const newIntegration = this.create(createIntegrationInput);
        const queryResult = await this.createQueryBuilder('integration-createAndSave', queryRunner)
            .insert()
            .values(newIntegration)
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
    async findByUserId(userId, queryRunner) {
        const queryResult = await this.createQueryBuilder('integration', queryRunner)
            .where({ userId })
            .getMany();
        console.log(queryResult);
        return queryResult;
    }
    async findByNetworkId(networkId, queryRunner) {
        const queryResult = await this.createQueryBuilder('integration', queryRunner)
            .where({ networkId })
            .getOne();
        return queryResult;
    }
};
IntegrationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], IntegrationRepository);
exports.IntegrationRepository = IntegrationRepository;
//# sourceMappingURL=integration.repository.js.map