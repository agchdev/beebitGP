import { IsOptional, IsInt, IsObject } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsObject({ message: 'El ID del staff debe ser un número entero.' })
  projectId?: Project;

  @IsOptional()
  @IsObject({ message: 'El ID del staff debe ser un número entero.' })
  staffId?: Staff;

  @IsOptional()
  fecha_asignacion?: Date;
}
