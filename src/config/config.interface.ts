export type StageType = 'prod' | 'local';

export interface Config {
  stage: StageType;
  port: number;
  databaseUrl: string;
  jwt: {
    secret: string;
    accessTokenExpirationTimeSeconds: number;
  };
  aws: {
    accessKey?: string;
    secretKey?: string;
    region?: string;
  };
}
