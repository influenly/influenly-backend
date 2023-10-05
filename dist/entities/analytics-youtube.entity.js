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
exports.AnalyticsYoutube = void 0;
const typeorm_1 = require("typeorm");
const integration_entity_1 = require("./integration.entity");
let AnalyticsYoutube = class AnalyticsYoutube extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], AnalyticsYoutube.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unique: true }),
    __metadata("design:type", Number)
], AnalyticsYoutube.prototype, "integrationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], AnalyticsYoutube.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], AnalyticsYoutube.prototype, "totalSubs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], AnalyticsYoutube.prototype, "totalVideos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AnalyticsYoutube.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AnalyticsYoutube.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => integration_entity_1.Integration),
    (0, typeorm_1.JoinColumn)({ name: 'integrationId' }),
    __metadata("design:type", integration_entity_1.Integration)
], AnalyticsYoutube.prototype, "integration", void 0);
AnalyticsYoutube = __decorate([
    (0, typeorm_1.Entity)('analytics_youtube')
], AnalyticsYoutube);
exports.AnalyticsYoutube = AnalyticsYoutube;
//# sourceMappingURL=analytics-youtube.entity.js.map