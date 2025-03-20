import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsObject } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';

export class UpdateAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsOptional()
  @IsObject({ message: 'El ID del staff debe ser un número entero.' })
  projectId?: Project;

  @ApiProperty({ example: 1, description: 'ID del staff' })
  @IsOptional()
  @IsObject({ message: 'El ID del staff debe ser un número entero.' })
  staffId?: Staff;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de asignación' })
  @IsOptional()
  fecha_asignacion?: Date;
}
