import { SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SESIntegration } from './ses.integration.abstract';

import type { Config } from '@app/config';

@Injectable()
export class SESIntegrationImpl implements SESIntegration {
  private readonly _client: SESClient;

  constructor(private readonly _config: ConfigService<Config, true>) {
    this._client = new SESClient({
      region: this._config.get('aws.region', { infer: true }),
      credentials: {
        accessKeyId: this._config.get('aws.accessKey', { infer: true }),
        secretAccessKey: this._config.get('aws.secretKey', { infer: true }),
      },
    });
  }

  public async sendEmail(): Promise<void> {
    // TODO: implement email sending logic
  }
}
