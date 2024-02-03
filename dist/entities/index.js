"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = exports.Message = exports.User = exports.Integration = exports.AnalyticsYoutube = exports.Credential = exports.Network = void 0;
const user_entity_1 = require("./user.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_entity_1.User; } });
const message_entity_1 = require("./message.entity");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return message_entity_1.Message; } });
const conversation_entity_1 = require("./conversation-entity");
Object.defineProperty(exports, "Conversation", { enumerable: true, get: function () { return conversation_entity_1.Conversation; } });
const network_entity_1 = require("./network.entity");
Object.defineProperty(exports, "Network", { enumerable: true, get: function () { return network_entity_1.Network; } });
const integration_entity_1 = require("./integration.entity");
Object.defineProperty(exports, "Integration", { enumerable: true, get: function () { return integration_entity_1.Integration; } });
const analytics_youtube_entity_1 = require("./analytics-youtube.entity");
Object.defineProperty(exports, "AnalyticsYoutube", { enumerable: true, get: function () { return analytics_youtube_entity_1.AnalyticsYoutube; } });
const credential_entitiy_1 = require("./credential.entitiy");
Object.defineProperty(exports, "Credential", { enumerable: true, get: function () { return credential_entitiy_1.Credential; } });
const entities = [
    network_entity_1.Network,
    credential_entitiy_1.Credential,
    analytics_youtube_entity_1.AnalyticsYoutube,
    integration_entity_1.Integration,
    user_entity_1.User,
    message_entity_1.Message,
    conversation_entity_1.Conversation
];
exports.default = entities;
//# sourceMappingURL=index.js.map