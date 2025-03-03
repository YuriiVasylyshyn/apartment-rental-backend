import { AppService } from './app.service.abstract';

export class AppServiceMock extends AppService {
  public getHello(): string {
    throw new Error('Method not implemented.');
  }

  public healthCheck(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
