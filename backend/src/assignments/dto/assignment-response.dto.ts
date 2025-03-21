import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDto } from 'src/projects/dto/project-response.dto';
import { StaffResponseDto } from 'src/staff/dto/staff-response.dto';

export class AssignmentResponseDto {
    @ApiProperty({ example: 1, description: 'ID único de la asignación' })
    id: number;

    @ApiProperty({ description: 'Proyecto asociado a la asignación', type: ProjectResponseDto })
    project: ProjectResponseDto;

    @ApiProperty({ description: 'Miembro del staff asignado', type: StaffResponseDto })
    staff: StaffResponseDto;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Fecha en que se realizó la asignación' })
    fecha_asignacion: Date;
}
