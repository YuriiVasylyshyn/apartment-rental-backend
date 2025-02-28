import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ApartmentEntity } from '../entities/apartment.entity';

@Injectable()
export class ApartmentRepository extends Repository<ApartmentEntity> {
  constructor(_dataSource: DataSource) {
    super(ApartmentEntity, _dataSource.createEntityManager());
  }
}
