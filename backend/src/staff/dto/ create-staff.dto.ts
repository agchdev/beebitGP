import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'John Doe', description: 'Nombre del staff' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @ApiProperty({ example: 'Rb4tD@example.com', description: 'Email del staff' })
  @IsEmail({}, { message: 'El email debe ser válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @ApiProperty({ example: 'Desarrollador', description: 'Rol del staff' })
  @IsString()
  @IsNotEmpty({ message: 'El rol es obligatorio.' })
  rol: string;
}
