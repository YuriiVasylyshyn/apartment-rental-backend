import { SignUpRequestDto } from '../../auth/dtos/req/sign-up.request.dto';
import { UserEntity } from '../entities/user.entity';
import { Role } from '../enums/role.enum';
import { UserService } from './user.service.abstract';

export class UserServiceMock implements UserService {
  public findOneByEmail(_email: string): Promise<UserEntity> {
    return Promise.resolve({
      id: 'fakeUserId',
      email: 'fakeEmail',
      fullName: 'fakeFullName',
      isRegistrationCompleted: true,
      password: 'fakePassword',
      role: Role.Tenant,
    } as UserEntity);
  }

  public checkIfUserExistsByEmail(_email: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  public saveUserAndReturnId(_data: SignUpRequestDto): Promise<string> {
    return Promise.resolve('fakeUserId');
  }
}
