import { configParser, configSchema } from '@app/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controllers/app.controller';
import { AppServiceImpl } from './services/app.service';
import { AppService } from './services/app.service.abstract';

const appService = { provide: AppService, useClass: AppServiceImpl };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      load: [configParser],
      validationSchema: configSchema,
    }),
  ],
  controllers: [AppController],
  providers: [appService],
})
export class AppModule {}
