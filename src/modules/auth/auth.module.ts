import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { AuthServiceImpl } from './services/auth.service';
import { AuthService } from './services/auth.service.abstract';

const authService = { provide: AuthService, useClass: AuthServiceImpl };

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [authService],
})
export class AuthModule {}
