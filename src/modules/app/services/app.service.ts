import { Injectable } from '@nestjs/common';

import { AppService } from './app.service.abstract';

@Injectable()
export class AppServiceImpl implements AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
