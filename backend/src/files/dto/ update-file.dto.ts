import { IsString, IsOptional, IsUrl, IsInt } from 'class-validator';

export class UpdateFileDto {
  @IsOptional()
  @IsInt({ message: 'El ID de la tarea debe ser un número entero.' })
  task?: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsUrl({}, { message: 'La URL debe ser válida.' })
  url?: string;

  @IsOptional()
  fecha_subida?: Date;
}
