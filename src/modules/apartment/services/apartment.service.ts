import { Injectable } from '@nestjs/common';

import { CreateApartmentRequest } from '../dto/req/create-apartment.request.dto';
import { ApartmentResponse } from '../dto/res/apartment.response.dto';
import { ApartmentRepository } from '../repositories/apartment.repository';
import { ApartmentService } from './apartment.service.abstract';

@Injectable()
export class ApartmentServiceImpl implements ApartmentService {
  constructor(private readonly _apartmentRepository: ApartmentRepository) {}

  public async createApartment(id: string, data: CreateApartmentRequest): Promise<ApartmentResponse> {
    const { id: apartmentId } = await this._apartmentRepository
      .create({
        ...data,
        ownerId: id,
      })
      .save();

    const res = await this._apartmentRepository.findOneOrFail({
      where: {
        id: apartmentId,
      },
      relations: {
        owner: true,
      },
    });

    return new ApartmentResponse(res);
  }
}
