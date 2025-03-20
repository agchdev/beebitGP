import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDto } from 'src/projects/dto/project-response.dto';
import { StaffResponseDto } from 'src/staff/dto/staff-response.dto';

export class InvitationResponseDto {
    @ApiProperty({ example: 1, description: 'ID único de la invitación' })
    id: number;

    @ApiProperty({ description: 'Proyecto asociado a la invitación', type: ProjectResponseDto })
    project: ProjectResponseDto;

    @ApiProperty({ description: 'Miembro del staff que envió la invitación', type: StaffResponseDto })
    sender: StaffResponseDto;

    @ApiProperty({ description: 'Miembro del staff que recibe la invitación', type: StaffResponseDto })
    recipient: StaffResponseDto;

    @ApiProperty({ example: 'Pendiente', description: 'Estado de la invitación (Pendiente, Aceptada, Rechazada)' })
    status: string;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Fecha en que se envió la invitación' })
    fecha_invitacion: Date;
}
