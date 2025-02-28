import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(_dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }
}
