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
exports.UserRoleGuard = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const metadata_request_1 = require("../constants/metadata-request");
let UserRoleGuard = class UserRoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const handlerValidRole = this.reflector.get(metadata_request_1.METADATA_REQUEST_ROLES, context.getHandler());
        const classValidRole = this.reflector.get(metadata_request_1.METADATA_REQUEST_ROLES, context.getClass());
        const validRoles = [handlerValidRole, classValidRole];
        if (validRoles.every((role) => !role))
            return true;
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const isValidRole = validRoles.filter((validRole) => validRole === user.role);
        if (isValidRole.length === 1)
            return true;
        throw new common_1.ForbiddenException(`User with role ${user.role} cannot access to a route protected to ${validRoles[0] || validRoles[1]}`);
    }
};
UserRoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], UserRoleGuard);
exports.UserRoleGuard = UserRoleGuard;
//# sourceMappingURL=user-role.guard.js.map