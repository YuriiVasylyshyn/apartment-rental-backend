import { Config, StageType } from './config.interface';

export const configParser = (): Config => ({
  stage: process.env.STAGE! as StageType,
  port: +process.env.PORT!,
  databaseUrl: process.env.DATABASE_URL!,
  jwt: {
    secret: process.env.JWT_SECRET!,
    accessTokenExpirationTimeSeconds: +process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
  },
});
