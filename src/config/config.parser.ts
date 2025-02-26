import { Config } from './config.interface';

export const configParser = (): Config => ({
  port: +process.env.PORT!,
});
