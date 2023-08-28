import * as dotenv from 'dotenv';

dotenv.config({ path: 'config/.env.local' });

const env = process.env;

export const modes = {
  dev: 'development',
  prod: 'production',
};

const isDev = env.NODE_ENV === modes.dev;

export const envData = {
  isDev,
  dbHost: env.DB_HOST,
  dbPort: env.DB_PORT,
  dbUser: env.DB_USER,
  dbPass: env.DB_PASSWORD,
  dbName: env.DB_NAME,
  jwt: {
    secret: env.JWT_SECRET,
    expires: env.JWT_EXPIRES,
  },
  cookiesSecret: env.COOKIE_SIGN,
  appHost: isDev ? 'http://localhost:3000' : env.APP_HOST,
  serverHost: isDev ? 'http://localhost:8357' : env.SERVER_HOST,
  serverIP: env.SERVER_IP,
};
