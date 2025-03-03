import type { CreateApartmentRequest } from '../dto/req/create-apartment.request.dto';
import type { ApartmentResponse } from '../dto/res/apartment.response.dto';

export abstract class ApartmentService {
  public abstract createApartment(id: string, data: CreateApartmentRequest): Promise<ApartmentResponse>;
}
