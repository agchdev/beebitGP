import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsInt({ message: 'El ID del proyecto debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio.' })
  proyecto: number;

  @ApiProperty({ example: 'Tarea 1', description: 'TitledBorder de la tarea' })
  @IsString()
  @IsNotEmpty({ message: 'El título de la tarea es obligatorio.' })
  title: string;

  @ApiProperty({ example: 'Descripción de la tarea', description: 'Descripción de la tarea' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 'Pendiente', description: 'Estado de la tarea' })
  @IsString()
  @IsNotEmpty({ message: 'El estado de la tarea es obligatorio.' })
  status: string;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de creación' })
  @IsDateString({}, { message: 'La fecha de creación debe tener un formato válido.' })
  @IsNotEmpty({ message: 'La fecha de creación es obligatoria.' })
  fecha_creacion: Date;

  @ApiProperty({ example: '2022-12-31', description: 'Fecha de vencimiento' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de vencimiento debe tener un formato válido.' })
  fecha_vencimiento?: Date;
}
