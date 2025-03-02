import { Injectable } from '@nestjs/common';

import { SignUpRequestDto } from '../../auth/dtos/req/sign-up.request.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service.abstract';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  public async findOneByEmail(email: string): Promise<UserEntity> {
    return this._userRepository.findOneByEmailOrThrowError(email);
  }

  public async checkIfUserExistsByEmail(email: string): Promise<boolean> {
    return this._userRepository.exists({ where: { email } });
  }

  public async saveUserAndReturnId(data: SignUpRequestDto): Promise<string> {
    const { id } = await this._userRepository.save({ ...data });
    return id;
  }
}
