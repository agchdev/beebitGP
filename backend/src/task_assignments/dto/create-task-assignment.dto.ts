import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID de la tarea' })
  @IsInt({ message: 'El ID de la tarea debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID de la tarea es obligatorio.' })
  task: number;

  @ApiProperty({ example: 1, description: 'ID del staff' })
  @IsInt({ message: 'El ID del staff debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del staff es obligatorio.' })
  staff: number;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de asignación' })
  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria.' })
  fecha_asignacion: Date;
}
