import { Test } from '@nestjs/testing';

import { UserEntity } from '../../user/entities/user.entity';
import { Role } from '../../user/enums/role.enum';
import { ApartmentEntity } from '../entities/apartment.entity';
import { ApartmentRepository } from '../repositories/apartment.repository';
import { ApartmentServiceImpl } from './apartment.service';
import { ApartmentService } from './apartment.service.abstract';

const mockApartmentRepo = {
  create: jest.fn(),
  findOneOrFail: jest.fn(),
};

describe('ApartmentService', () => {
  let apartmentService: ApartmentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: ApartmentService, useClass: ApartmentServiceImpl },
        { provide: ApartmentRepository, useValue: mockApartmentRepo },
      ],
    }).compile();

    apartmentService = moduleRef.get(ApartmentService);
  });

  describe('createApartment', () => {
    it('Should createApartment without errors', async () => {
      jest.spyOn(mockApartmentRepo, 'create').mockReturnValue({
        save: jest.fn().mockResolvedValueOnce({
          id: 'fakeId',
          title: 'First apartment',
          description: 'Nice apartment',
          country: 'UA',
          city: 'Lviv',
          price: 1000,
          rooms: 2,
          areaSqm: 35,
        } as ApartmentEntity),
      });

      jest.spyOn(mockApartmentRepo, 'findOneOrFail').mockResolvedValueOnce({
        id: 'fakeId',
        title: 'First apartment',
        description: 'Nice apartment',
        country: 'UA',
        city: 'Lviv',
        price: 1000,
        rooms: 2,
        areaSqm: 35,
        owner: {
          id: 'fakeUserId',
          email: 'fakeEmail',
          fullName: 'fakeFullName',
          isRegistrationCompleted: true,
          password: 'fakePassword',
          role: Role.Landlord,
        } as UserEntity,
      } as ApartmentEntity);

      const res = await apartmentService.createApartment('fakeUserId', {
        title: 'First apartment',
        description: 'Nice apartment',
        country: 'UA',
        city: 'Lviv',
        price: 1000,
        rooms: 2,
        areaSqm: 35,
      });
      expect(res).toEqual({
        id: 'fakeId',
        title: 'First apartment',
        description: 'Nice apartment',
        country: 'UA',
        city: 'Lviv',
        price: 1000,
        rooms: 2,
        areaSqm: 35,
        owner: {
          id: 'fakeUserId',
          email: 'fakeEmail',
          fullName: 'fakeFullName',
          role: Role.Landlord,
        },
      });
    });
  });
});
