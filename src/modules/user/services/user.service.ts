import { Injectable } from '@nestjs/common';

import { UserService } from './user.service.abstract';

@Injectable()
export class UserServiceImpl implements UserService {}
