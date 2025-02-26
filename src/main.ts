import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { Config } from './config';
import { AppModule } from './modules/app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<Config, true>>(ConfigService);

  await app.listen(config.get('port', { infer: true }));
}

bootstrap().catch(() => process.exit(1));
