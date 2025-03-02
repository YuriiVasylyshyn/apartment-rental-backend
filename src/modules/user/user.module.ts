import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserServiceImpl } from './services/user.service';
import { UserService } from './services/user.service.abstract';

const userService = { provide: UserService, useClass: UserServiceImpl };

@Module({
  imports: [],
  controllers: [UserController],
  providers: [userService, UserRepository],
  exports: [userService],
})
export class UserModule {}
