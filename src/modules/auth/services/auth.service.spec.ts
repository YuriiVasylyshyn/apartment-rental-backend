import { Response } from 'express';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { EncryptUtility } from '../../../utils/encrypt.utility';
import { UserEntity } from '../../user/entities/user.entity';
import { Role } from '../../user/enums/role.enum';
import { UserService } from '../../user/services/user.service.abstract';
import { UserServiceMock } from '../../user/services/user.service.mock';
import { AuthServiceImpl } from './auth.service';
import { AuthService } from './auth.service.abstract';

const mockJwtService = {
  signAsync: jest.fn(),
};

const fakeConfig = {
  get: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceImpl },
        { provide: UserService, useClass: UserServiceMock },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: fakeConfig },
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
    userService = moduleRef.get(UserService);
    jwtService = moduleRef.get(JwtService);
    configService = moduleRef.get(ConfigService);
  });

  describe('signUp', () => {
    it('Should signUp without errors', async () => {
      jest.spyOn(userService, 'checkIfUserExistsByEmail').mockResolvedValueOnce(false);
      EncryptUtility.generateHash = jest.fn().mockResolvedValueOnce('fakePassword');
      jest.spyOn(userService, 'saveUserAndReturnId').mockResolvedValueOnce('fakeUserId');

      const res = await authService.signUp({
        email: 'fakeEmail',
        fullName: 'fakeFullName',
        password: 'fakePassword',
        role: Role.Tenant,
      });
      expect(res).toEqual('fakeUserId');
    });

    it('Should throw ForbiddenException', async () => {
      jest.spyOn(userService, 'checkIfUserExistsByEmail').mockResolvedValueOnce(true);

      try {
        await authService.signUp({
          email: 'fakeEmail',
          fullName: 'fakeFullName',
          password: 'fakePassword',
          role: Role.Tenant,
        });
      } catch (err) {
        expect(err instanceof ForbiddenException).toBeTruthy();
        expect((err as ForbiddenException).message).toBe('User already exists');
      }
    });
  });

  describe('signIn', () => {
    const response = {
      cookie: jest.fn(),
    } as Partial<Response> as Response;
    const user = {
      id: 'fakeUserId',
      email: 'fakeEmail',
      fullName: 'fakeFullName',
      isRegistrationCompleted: true,
      password: 'fakePassword',
      role: Role.Tenant,
    } as UserEntity;

    it('Should signIn without errors', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      EncryptUtility.compareHash = jest.fn().mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('fakeToken');
      jest.spyOn(configService, 'get').mockImplementation((key: string) => {
        if (key === 'jwt.accessTokenExpirationTimeSeconds') return 60;
        if (key === 'stage') return 'prod';
        return undefined;
      });

      await expect(
        authService.signIn(
          {
            email: 'fakeEmail',
            password: 'fakePassword',
          },
          response,
        ),
      ).resolves.not.toThrow();
    });

    it('Should throw UnauthorizedException', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user);
      EncryptUtility.compareHash = jest.fn().mockResolvedValueOnce(false);

      try {
        await authService.signIn(
          {
            email: 'fakeEmail',
            password: 'fakePassword',
          },
          response,
        );
      } catch (err) {
        expect(err instanceof UnauthorizedException).toBeTruthy();
        expect((err as ForbiddenException).message).toBeDefined();
      }
    });
  });
});
