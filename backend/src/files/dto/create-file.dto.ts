import { IsString, IsNotEmpty, IsUrl, IsInt } from 'class-validator';

export class CreateFileDto {
  @IsInt({ message: 'El ID de la tarea debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID de la tarea es obligatorio.' })
  task: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del archivo es obligatorio.' })
  nombre: string;

  @IsUrl({}, { message: 'La URL debe ser válida.' })
  @IsNotEmpty({ message: 'La URL del archivo es obligatoria.' })
  url: string;

  @IsNotEmpty({ message: 'La fecha de subida es obligatoria.' })
  fecha_subida: Date;
}
