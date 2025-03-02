import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(_dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }

  public async findOneByEmailOrThrowError(
    email: string,
    relations?: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.findOne({
      where: { email },
      relations,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
