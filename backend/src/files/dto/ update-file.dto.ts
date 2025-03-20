import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsInt } from 'class-validator';
import { Task } from 'src/tasks/entities/task.entity/task.entity';

export class UpdateFileDto {
  @ApiProperty({ example: 1, description: 'ID de la tarea' })
  @IsOptional()
  @IsInt({ message: 'El ID de la tarea debe ser un número entero.' })
  task?: Task;

  @ApiProperty({ example: 'archivo.pdf', description: 'Nombre del archivo' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ example: 'https://example.com/file.pdf', description: 'URL del archivo' })
  @IsOptional()
  @IsUrl({}, { message: 'La URL debe ser válida.' })
  url?: string;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de subida' })
  @IsOptional()
  fecha_subida?: Date;
}
