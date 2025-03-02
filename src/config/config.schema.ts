import * as Joi from 'joi';

export const configSchema = Joi.object({
  STAGE: Joi.string().valid('prod', 'local').default('prod'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.number().required(),
});
