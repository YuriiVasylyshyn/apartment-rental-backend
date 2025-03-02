import { Module } from '@nestjs/common';

import { ApartmentController } from './controllers/apartment.controller';
import { ApartmentServiceImpl } from './services/apartment.service';
import { ApartmentService } from './services/apartment.service.abstract';

const apartmentService = { provide: ApartmentService, useValue: ApartmentServiceImpl };

@Module({
  imports: [],
  controllers: [ApartmentController],
  providers: [apartmentService],
})
export class ApartmentModule {}
