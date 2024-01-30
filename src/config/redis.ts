import { pick } from 'lodash';
import * as Joi from 'joi';

require('dotenv').config();

const CONFIG_KEYS = ['REDIS_HOST', 'REDIS_PORT'];

const stringRequired = Joi.string().required();

const schema = Joi.object().keys({
  REDIS_HOST: stringRequired,
  REDIS_PORT: stringRequired
});

const items = pick(process.env, CONFIG_KEYS);

const config = schema.validate(items);

if (config.error) {
  throw new Error(
    `Missing environment variable\n
    ${config.error.toString()}\n
    HINT => Compare your .env file with .env.example\n`
  );
}

export default () => ({
  redis: {
    host: config.value.REDIS_HOST,
    port: config.value.REDIS_PORT
  }
});
