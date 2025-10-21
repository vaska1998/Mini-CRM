import Joi from 'joi';

export const configValidationSchema = Joi.object({
  ENV: Joi.string().default('local'),
  MONGO_URI: Joi.string().required(),
  APP_PORT: Joi.number().default(3000),
  CLIENT_BASE_URL: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().default('admin@admin.com'),
  MAIL_HOST: Joi.string().default('localhost'),
  MAIL_PORT: Joi.number().default(1025),
});
