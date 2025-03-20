import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsObject } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';
export class CreateAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsObject({ message: 'El ID del proyecto debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio.' })
  projectId: Project;

  @ApiProperty({ example: 1, description: 'ID del staff' })
  @IsObject({ message: 'El ID del staff debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del staff es obligatorio.' })
  staffId: Staff;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de asignación' })
  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria.' })
  fecha_asignacion: Date;
}
