import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @IsEmail({}, { message: 'El email debe ser válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El rol es obligatorio.' })
  rol: string;
}
