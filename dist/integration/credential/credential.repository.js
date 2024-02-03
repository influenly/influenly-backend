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
exports.CredentialRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
let CredentialRepository = class CredentialRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.Credential, dataSource.createEntityManager());
    }
    async createAndSave(createCredentialInput, queryRunner) {
        const newCredential = this.create(createCredentialInput);
        const queryResult = await this.createQueryBuilder('credential-createAndSave', queryRunner)
            .insert()
            .values(newCredential)
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
    async findByIntegrationId(integrationId, queryRunner) {
        const queryResult = await this.createQueryBuilder('credential', queryRunner)
            .where({ integrationId })
            .getOne();
        console.log(queryResult);
        return queryResult;
    }
};
CredentialRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CredentialRepository);
exports.CredentialRepository = CredentialRepository;
//# sourceMappingURL=credential.repository.js.map