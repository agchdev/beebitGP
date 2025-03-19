import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser válido.' })
  email?: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
