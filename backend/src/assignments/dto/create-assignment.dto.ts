import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsObject } from 'class-validator';
export class CreateAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsObject({ message: 'El ID del proyecto debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio.' })
  projectId: number;

  @ApiProperty({ example: 1, description: 'ID del staff' })
  @IsObject({ message: 'El ID del staff debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID del staff es obligatorio.' })
  staffId: number;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de asignación' })
  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria.' })
  fecha_asignacion: Date;
}
