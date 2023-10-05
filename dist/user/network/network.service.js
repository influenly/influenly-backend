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
exports.NetworkService = void 0;
const common_1 = require("@nestjs/common");
const network_repository_1 = require("./network.repository");
let NetworkService = class NetworkService {
    constructor(networkRepository) {
        this.networkRepository = networkRepository;
    }
    async create(createNetworkInput, queryRunner) {
        const newNetwork = await this.networkRepository.createAndSave(createNetworkInput, queryRunner);
        return newNetwork;
    }
    async getById(id, queryRunner) {
        const network = await this.networkRepository.findById(id, queryRunner);
        return network;
    }
    async getByUserId(userId, queryRunner) {
        const network = await this.networkRepository.findByUserId(userId, queryRunner);
        return network;
    }
};
NetworkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [network_repository_1.NetworkRepository])
], NetworkService);
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map