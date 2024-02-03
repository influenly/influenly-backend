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
exports.UserTypeGuard = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const metadata_request_1 = require("../constants/metadata-request");
let UserTypeGuard = class UserTypeGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const handlerValidType = this.reflector.get(metadata_request_1.METADATA_REQUEST_TYPES, context.getHandler());
        const classValidType = this.reflector.get(metadata_request_1.METADATA_REQUEST_TYPES, context.getClass());
        const validTypes = [handlerValidType, classValidType];
        if (validTypes.every((type) => !type))
            return true;
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const isValidType = validTypes.filter((validType) => validType === user.type);
        if (isValidType.length === 1)
            return true;
        throw new common_1.ForbiddenException(`User with type ${user.type} cannot acces to a route protected to ${validTypes[0] || validTypes[1]}`);
    }
};
UserTypeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], UserTypeGuard);
exports.UserTypeGuard = UserTypeGuard;
//# sourceMappingURL=user-type.guard.js.map