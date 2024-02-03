"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Joi = require("joi");
require('dotenv').config();
const CONFIG_KEYS = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
const stringRequired = Joi.string().required();
const schema = Joi.object().keys({
    GOOGLE_CLIENT_ID: stringRequired,
    GOOGLE_CLIENT_SECRET: stringRequired
});
const items = (0, lodash_1.pick)(process.env, CONFIG_KEYS);
const config = schema.validate(items);
if (config.error) {
    throw new Error(`Missing environment variable\n
    ${config.error.toString()}\n
    HINT => Compare your .env file with .env.example\n`);
}
exports.default = () => ({
    google: {
        clientId: config.value.GOOGLE_CLIENT_ID,
        clientSecret: config.value.GOOGLE_CLIENT_SECRET
    }
});
//# sourceMappingURL=google.js.map