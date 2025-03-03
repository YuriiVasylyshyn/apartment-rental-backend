import { UserResponse } from '../../../user/dtos/res/user.response.dto';
import { ApartmentEntity } from '../../entities/apartment.entity';

export class ApartmentResponse {
  public id!: string;
  public title!: string;
  public description!: string | null;
  public country!: string;
  public city!: string;
  public state!: string | null;
  public price!: number;
  public rooms!: number | null;
  public areaSqm!: number;
  public owner!: UserResponse;

  constructor(apartment: ApartmentEntity) {
    this.id = apartment.id;
    this.title = apartment.title;
    this.description = apartment.description;
    this.country = apartment.country;
    this.city = apartment.city;
    this.state = apartment.state;
    this.price = apartment.price;
    this.rooms = apartment.rooms;
    this.areaSqm = apartment.areaSqm;
    this.owner = new UserResponse(apartment.owner);
  }
}
