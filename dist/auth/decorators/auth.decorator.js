"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_role_guard_1 = require("../guards/user-role.guard");
const user_type_guard_1 = require("../guards/user-type.guard");
const role_protected_decorator_1 = require("./role-protected.decorator");
const type_protected_decorator_1 = require("./type-protected.decorator");
function Auth(input) {
    return (0, common_1.applyDecorators)((0, role_protected_decorator_1.RoleProtected)(input === null || input === void 0 ? void 0 : input.role), (0, type_protected_decorator_1.TypeProtected)(input === null || input === void 0 ? void 0 : input.type), (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), user_role_guard_1.UserRoleGuard, user_type_guard_1.UserTypeGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map