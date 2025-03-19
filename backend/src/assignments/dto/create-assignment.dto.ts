import { IsNotEmpty, IsInt, IsObject } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';
export class CreateAssignmentDto {
  @IsObject({ message: 'El ID del proyecto debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio.' })
  projectId: Project;

  @IsObject({ message: 'El ID del staff debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del staff es obligatorio.' })
  staffId: Staff;

  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria.' })
  fecha_asignacion: Date;
}
