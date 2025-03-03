import { Module } from '@nestjs/common';

import { ApartmentController } from './controllers/apartment.controller';
import { ApartmentRepository } from './repositories/apartment.repository';
import { ApartmentServiceImpl } from './services/apartment.service';
import { ApartmentService } from './services/apartment.service.abstract';

const apartmentService = { provide: ApartmentService, useClass: ApartmentServiceImpl };

@Module({
  imports: [],
  controllers: [ApartmentController],
  providers: [apartmentService, ApartmentRepository],
})
export class ApartmentModule {}
