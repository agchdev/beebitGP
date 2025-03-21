import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateStaffDto {
  @ApiProperty({ example: 'John Doe', description: 'Nombre del staff' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Rb4tD@example.com', description: 'Email del staff' })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser válido.' })
  email?: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del staff' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'Desarrollador', description: 'Rol del staff' })
  @IsOptional()
  @IsString()
  rol?: string;
}
