import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../../user/enums/role.enum';

export class SignUpRequestDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(120)
  @Transform((params: { value: unknown }) =>
    typeof params.value === 'string' ? params.value.trim().toLocaleLowerCase() : params.value,
  )
  public email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  public fullName!: string;

  @ApiProperty({ example: 'Qwerty1!' })
  @IsString()
  @IsStrongPassword()
  @MaxLength(120)
  public password!: string;

  @ApiProperty()
  @IsEnum(Role)
  public role!: Role;
}
