import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsInt } from 'class-validator';
import { Task } from 'src/tasks/entities/task.entity/task.entity';

export class CreateFileDto {
  @ApiProperty({ example: 1, description: 'ID de la tarea' })
  @IsInt({ message: 'El ID de la tarea debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID de la tarea es obligatorio.' })
  task: Task;

  @ApiProperty({ example: 'archivo.pdf', description: 'Nombre del archivo' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del archivo es obligatorio.' })
  nombre: string;

  @ApiProperty({ example: 'https://example.com/file.pdf', description: 'URL del archivo' })
  @IsUrl({}, { message: 'La URL debe ser válida.' })
  @IsNotEmpty({ message: 'La URL del archivo es obligatoria.' })
  url: string;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de subida' })
  @IsNotEmpty({ message: 'La fecha de subida es obligatoria.' })
  fecha_subida: Date;
}
