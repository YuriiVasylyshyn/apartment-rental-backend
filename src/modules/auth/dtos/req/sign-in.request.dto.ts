import { Transform } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  @Transform((params: { value: unknown }) =>
    typeof params.value === 'string' ? params.value.trim().toLocaleLowerCase() : params.value,
  )
  public email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  public password!: string;
}
