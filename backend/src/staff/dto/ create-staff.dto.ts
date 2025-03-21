import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'agch', description: 'Nombre del staff' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @ApiProperty({ example: 'example@example.com', description: 'Email del staff' })
  @IsEmail({}, { message: 'El email debe ser válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @ApiProperty({ example: '1234566', description: 'Contraseña del staff' })
  @IsString()
  @IsNotEmpty({ message: 'La contrasena es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }) // ✅ Nueva validación
  password: string;

  @ApiProperty({ example: 'Desarrollador', description: 'Rol del staff' })
  @IsString()
  @IsNotEmpty({ message: 'El rol es obligatorio.' })
  rol: string;
}
