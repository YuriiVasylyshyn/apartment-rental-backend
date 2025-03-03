import { AuthorizedUser, User } from 'src/decorators/user.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Protected } from '../../../decorators/protected.decorator';
import { Role } from '../../user/enums/role.enum';
import { CreateApartmentRequest } from '../dto/req/create-apartment.request.dto';
import { ApartmentResponse } from '../dto/res/apartment.response.dto';
import { ApartmentService } from '../services/apartment.service.abstract';

@ApiTags('Apartments')
@Controller('apartments')
export class ApartmentController {
  constructor(private readonly _apartmentService: ApartmentService) {}

  @Protected(Role.Landlord)
  @Post('/create')
  public async createApartment(
    @AuthorizedUser() user: User,
    @Body() data: CreateApartmentRequest,
  ): Promise<ApartmentResponse> {
    return this._apartmentService.createApartment(user.id, data);
  }
}
