import { DataSource } from 'typeorm';
import { Test } from '@nestjs/testing';

import { AppServiceImpl } from './app.service';
import { AppService } from './app.service.abstract';

const mockedDataSource = {
  query: jest.fn(),
};

describe('AppService', () => {
  let appService: AppService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: AppService, useClass: AppServiceImpl },
        {
          provide: DataSource,
          useValue: mockedDataSource,
        },
      ],
    }).compile();

    appService = moduleRef.get(AppService);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('getHello', () => {
    it('should return a string', () => {
      const res = appService.getHello();
      expect(res).toStrictEqual('Hello World!');
    });
  });

  describe('healthCheck', () => {
    it('should return a string', async () => {
      jest.spyOn(mockedDataSource, 'query').mockResolvedValueOnce([
        {
          version: 'version',
        },
      ]);

      const res = await appService.healthCheck();
      expect(res).toStrictEqual('OK');
    });
  });
});
