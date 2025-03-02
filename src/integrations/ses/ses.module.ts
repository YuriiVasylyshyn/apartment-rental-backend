import { Module } from '@nestjs/common';

import { SESIntegrationImpl } from './ses.integration';
import { SESIntegration } from './ses.integration.abstract';

const sesIntegration = { provide: SESIntegration, useClass: SESIntegrationImpl };

@Module({
  providers: [sesIntegration],
  exports: [sesIntegration],
})
export default class SESIntegrationModule {}
