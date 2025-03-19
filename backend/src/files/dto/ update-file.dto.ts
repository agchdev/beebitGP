import { IsString, IsOptional, IsUrl, IsInt } from 'class-validator';
import { Task } from 'src/tasks/entities/task.entity/task.entity';

export class UpdateFileDto {
  @IsOptional()
  @IsInt({ message: 'El ID de la tarea debe ser un número entero.' })
  task?: Task;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsUrl({}, { message: 'La URL debe ser válida.' })
  url?: string;

  @IsOptional()
  fecha_subida?: Date;
}
