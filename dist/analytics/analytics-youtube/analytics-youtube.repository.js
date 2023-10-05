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
exports.AnalyticsYoutubeRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
let AnalyticsYoutubeRepository = class AnalyticsYoutubeRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.AnalyticsYoutube, dataSource.createEntityManager());
    }
    async createAndSave(createAnalyticsYoutubeInput, queryRunner) {
        const newAnalyticsYoutube = this.create(createAnalyticsYoutubeInput);
        const queryResult = await this.createQueryBuilder('analytics-youtube-createAndSave', queryRunner)
            .insert()
            .values(newAnalyticsYoutube)
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
    async findByUserId(userId, queryRunner) {
        const queryResult = await this.createQueryBuilder('analytics_youtube', queryRunner)
            .innerJoin('analytics_youtube.integration', 'integration')
            .where('integration.userId = :userId', { userId })
            .getMany();
        console.log(queryResult);
        return queryResult;
    }
    async findByIntegrationId(integrationId, queryRunner) {
        const queryResult = await this.createQueryBuilder('analytics_youtube', queryRunner)
            .where({ integrationId })
            .getOne();
        return queryResult;
    }
};
AnalyticsYoutubeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AnalyticsYoutubeRepository);
exports.AnalyticsYoutubeRepository = AnalyticsYoutubeRepository;
//# sourceMappingURL=analytics-youtube.repository.js.map