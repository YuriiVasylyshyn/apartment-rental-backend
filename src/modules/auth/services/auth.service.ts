import { Injectable } from '@nestjs/common';

import { AuthService } from './auth.service.abstract';

@Injectable()
export class AuthServiceImpl implements AuthService {}
