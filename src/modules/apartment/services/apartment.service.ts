import { Injectable } from '@nestjs/common';

import { ApartmentService } from './apartment.service.abstract';

@Injectable()
export class ApartmentServiceImpl implements ApartmentService {}
