import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsDateString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({
    example: 'Proyecto 1',
    description: 'Nombre del proyecto',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Descripción del proyecto',
    description: 'Descripción del proyecto',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL de la imagen del proyecto',
  })
  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida.' })
  imagen_url?: string;

  @ApiProperty({
    example: '2022-01-01',
    description: 'Fecha de inicio del proyecto',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato válido.' })
  start_date?: Date;

  @ApiProperty({
    example: '2022-12-31',
    description: 'Fecha de fin del proyecto',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe tener un formato válido.' })
  end_date?: Date;

  @ApiProperty({
    example: 'Activo',
    description: 'Estado del proyecto',
  })
  @IsOptional()
  @IsString()
  status?: string;
}
