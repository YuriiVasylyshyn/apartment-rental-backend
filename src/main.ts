import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { name, version } from '../package.json';
import { Config } from './config';
import { AppModule, internalModules } from './modules/app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<Config, true>>(ConfigService);

  const privateDocument = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(`${name} - API Docs`)
      .setVersion(version as string)
      .build(),
    {
      include: [...internalModules, AppModule],
    },
  );

  SwaggerModule.setup('docs', app, privateDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(config.get('port', { infer: true }));
}

bootstrap().catch(() => process.exit(1));
