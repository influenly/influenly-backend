"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleProtected = void 0;
const common_1 = require("@nestjs/common");
const metadata_request_1 = require("../constants/metadata-request");
const RoleProtected = (role) => {
    return (0, common_1.SetMetadata)(metadata_request_1.METADATA_REQUEST_ROLES, role);
};
exports.RoleProtected = RoleProtected;
//# sourceMappingURL=role-protected.decorator.js.map