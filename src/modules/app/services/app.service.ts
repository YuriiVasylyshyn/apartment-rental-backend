import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { AppService } from './app.service.abstract';

@Injectable()
export class AppServiceImpl implements AppService {
  constructor(private readonly _dataSource: DataSource) {}
  public getHello(): string {
    return 'Hello World!';
  }

  public async healthCheck(): Promise<string> {
    await this._dataSource.query('select version()');

    return 'OK';
  }
}
