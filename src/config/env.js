import dotenv from 'dotenv';
import program from './commander.js';

const opts = program.opts();

dotenv.config({
  path: opts.mode == 'production' ? './.env.production' : './.env.development'
})

const configEnv = {
  app_name: process.env.APP_NAME,
  port: process.env.PORT,
  jwt_code: process.env.JWT_SECRET_CODE,
  persistence: process.env.PERSISTENCE,
  mongo_uri: process.env.MONGO_URI,
  uadmins: process.env.USERS_ADMIN,
  uadmin_pass: process.env.USER_ADMIN_PASS,
  development: opts.mode == 'development',
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  cors_origin: process.env.CORS_ORIGIN
}

export default configEnv;