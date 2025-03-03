import { CreateApartmentRequest } from '../dto/req/create-apartment.request.dto';
import { ApartmentResponse } from '../dto/res/apartment.response.dto';
import { ApartmentService } from './apartment.service.abstract';

export class ApartmentServiceMock implements ApartmentService {
  public createApartment(_id: string, _data: CreateApartmentRequest): Promise<ApartmentResponse> {
    throw new Error('Method not implemented.');
  }
}
