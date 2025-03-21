import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';

export class UpdateAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsOptional()
  @IsInt({ message: 'El ID del proyecto debe ser un número entero.' })
  projectId?: number;

  @ApiProperty({ example: 1, description: 'ID del staff' })
  @IsOptional()
  @IsInt({ message: 'El ID del staff debe ser un número entero.' })
  staffId?: number;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de asignación' })
  @IsOptional()
  fecha_asignacion?: Date;
}
