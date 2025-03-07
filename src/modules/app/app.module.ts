import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Config, configParser, configSchema } from '@app/config';
import { ApartmentModule } from '../apartment/apartment.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AppController } from './controllers/app.controller';
import { AppServiceImpl } from './services/app.service';
import { AppService } from './services/app.service.abstract';

export const internalModules = [ApartmentModule, UserModule, AuthModule];

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

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Config, true>) => {
        return {
          type: 'postgres',
          url: config.get('databaseUrl'),
          entities: [path.join(__dirname, '..', '**', '*.{entity,view}.{ts,js}')],
          migrations: [path.join(__dirname, '..', '..', 'migrations/*{.ts,.js}')],
          migrationsTransactionMode: 'each',
          migrationsRun: false, //NOTE: Should be 'false' for local environment
          synchronize: false,
          namingStrategy: new SnakeNamingStrategy(),
        } as TypeOrmModuleOptions;
      },
    }),

    ...internalModules,
  ],
  controllers: [AppController],
  providers: [appService],
})
export class AppModule {}
