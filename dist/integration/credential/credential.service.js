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
exports.CredentialService = void 0;
const common_1 = require("@nestjs/common");
const credential_repository_1 = require("./credential.repository");
let CredentialService = class CredentialService {
    constructor(credentialRepository) {
        this.credentialRepository = credentialRepository;
    }
    async create(createCredentialInput, queryRunner) {
        const newCredential = await this.credentialRepository.createAndSave(createCredentialInput, queryRunner);
        return newCredential;
    }
    async getAll() {
        const credentials = await this.credentialRepository.find();
        return credentials;
    }
    async getByIntegrationId(integrationId, queryRunner) {
        const credential = await this.credentialRepository.findByIntegrationId(integrationId, queryRunner);
        return credential;
    }
};
CredentialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [credential_repository_1.CredentialRepository])
], CredentialService);
exports.CredentialService = CredentialService;
//# sourceMappingURL=credential.service.js.map