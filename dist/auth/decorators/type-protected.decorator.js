"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeProtected = void 0;
const common_1 = require("@nestjs/common");
const metadata_request_1 = require("../constants/metadata-request");
const TypeProtected = (type) => {
    return (0, common_1.SetMetadata)(metadata_request_1.METADATA_REQUEST_TYPES, type);
};
exports.TypeProtected = TypeProtected;
//# sourceMappingURL=type-protected.decorator.js.map