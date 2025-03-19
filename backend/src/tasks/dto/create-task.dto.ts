import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsInt({ message: 'El ID del proyecto debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio.' })
  proyecto: number;

  @IsString()
  @IsNotEmpty({ message: 'El título de la tarea es obligatorio.' })
  title: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  @IsNotEmpty({ message: 'El estado de la tarea es obligatorio.' })
  status: string;

  @IsDateString({}, { message: 'La fecha de creación debe tener un formato válido.' })
  @IsNotEmpty({ message: 'La fecha de creación es obligatoria.' })
  fecha_creacion: Date;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de vencimiento debe tener un formato válido.' })
  fecha_vencimiento?: Date;
}
