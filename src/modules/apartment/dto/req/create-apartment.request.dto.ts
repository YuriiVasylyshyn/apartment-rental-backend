import { IsNotEmpty, IsNumber, IsOptional, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentRequest {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  public title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  public description!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public country!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  public city!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  @IsOptional()
  public state?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public price!: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public rooms!: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(10)
  public areaSqm!: number;
}
