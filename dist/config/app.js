"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Joi = require("joi");
require('dotenv').config();
const CONFIG_KEYS = ['API_PORT', 'JWT_SECRET', 'JWT_EXPIRES_IN'];
const stringRequired = Joi.string().required();
const numberRequired = Joi.number().required();
const schema = Joi.object().keys({
    API_PORT: numberRequired,
    JWT_SECRET: stringRequired,
    JWT_EXPIRES_IN: stringRequired
});
const items = (0, lodash_1.pick)(process.env, CONFIG_KEYS);
const config = schema.validate(items);
if (config.error) {
    throw new Error(`Missing environment variable\n
    ${config.error.toString()}\n
    HINT => Compare your .env file with .env.example\n`);
}
exports.default = () => ({
    app: {
        api: { port: config.value.API_PORT },
        jwt: {
            secret: config.value.JWT_SECRET,
            expiresIn: config.value.JWT_EXPIRES_IN
        }
    }
});
//# sourceMappingURL=app.js.map