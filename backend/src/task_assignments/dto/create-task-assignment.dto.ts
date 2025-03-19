import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskAssignmentDto {
  @IsInt({ message: 'El ID de la tarea debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID de la tarea es obligatorio.' })
  task: number;

  @IsInt({ message: 'El ID del staff debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del staff es obligatorio.' })
  staff: number;

  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria.' })
  fecha_asignacion: Date;
}
