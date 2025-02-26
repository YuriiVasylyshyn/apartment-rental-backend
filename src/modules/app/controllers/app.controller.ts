import { Controller, Get } from '@nestjs/common';

import { AppService } from '../services/app.service.abstract';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get('hello')
  public getHello(): string {
    return this._appService.getHello();
  }
}
