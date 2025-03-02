import { Test } from '@nestjs/testing';

import { UserEntity } from '../entities/user.entity';
import { Role } from '../enums/role.enum';
import { UserRepository } from '../repositories/user.repository';
import { UserServiceImpl } from './user.service';
import { UserService } from './user.service.abstract';

const mockUserRepo = {
  findOneByEmailOrThrowError: jest.fn(),
  exists: jest.fn(),
  save: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: UserService, useClass: UserServiceImpl },
        { provide: UserRepository, useValue: mockUserRepo },
      ],
    }).compile();

    userService = moduleRef.get(UserService);
  });

  const user = {
    id: 'fakeUserId',
    email: 'fakeEmail',
    fullName: 'fakeFullName',
    isRegistrationCompleted: true,
    password: 'fakePassword',
    role: Role.Tenant,
  } as UserEntity;

  describe('findOneByEmail', () => {
    it('Should findOneByEmail without errors', async () => {
      jest.spyOn(mockUserRepo, 'findOneByEmailOrThrowError').mockResolvedValueOnce(user);

      const res = await userService.findOneByEmail('fakeEmail');
      expect(res).toEqual(user);
    });
  });

  describe('checkIfUserExistsByEmail', () => {
    it('Should checkIfUserExistsByEmail without errors', async () => {
      jest.spyOn(mockUserRepo, 'exists').mockResolvedValueOnce(true);

      const res = await userService.checkIfUserExistsByEmail('fakeEmail');
      expect(res).toEqual(true);
    });
  });

  describe('saveUserAndReturnId', () => {
    it('Should saveUserAndReturnId without errors', async () => {
      jest.spyOn(mockUserRepo, 'save').mockResolvedValueOnce(user);

      const res = await userService.saveUserAndReturnId({
        email: 'fakeEmail',
        fullName: 'fakeFullName',
        password: 'fakePassword',
        role: Role.Tenant,
      });
      expect(res).toEqual('fakeUserId');
    });
  });
});
