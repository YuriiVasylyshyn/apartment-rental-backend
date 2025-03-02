import { Config, StageType } from './config.interface';

export const configParser = (): Config => ({
  stage: process.env.STAGE! as StageType,
  port: +process.env.PORT!,
  databaseUrl: process.env.DATABASE_URL!,
  jwt: {
    secret: process.env.JWT_SECRET!,
    accessTokenExpirationTimeSeconds: +process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});
