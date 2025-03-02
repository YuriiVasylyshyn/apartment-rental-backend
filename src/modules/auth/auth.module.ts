import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Config } from '@app/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthServiceImpl } from './services/auth.service';
import { AuthService } from './services/auth.service.abstract';
import { JwtStrategy } from './strategies/jwt.strategy';

const authService = { provide: AuthService, useClass: AuthServiceImpl };

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Config, true>) => {
        return {
          global: true,
          secret: config.get('jwt.secret', { infer: true }),
          signOptions: {
            expiresIn: `${config.get('jwt.accessTokenExpirationTimeSeconds', { infer: true })}s`,
          },
        };
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [authService, JwtStrategy],
})
export class AuthModule {}
