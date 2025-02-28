import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserServiceImpl } from './services/user.service';
import { UserService } from './services/user.service.abstract';

const userService = { provide: UserService, useClass: UserServiceImpl };

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [userService],
})
export class UserModule {}
