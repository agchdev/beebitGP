import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDto } from 'src/projects/dto/project-response.dto';
import { StaffResponseDto } from 'src/staff/dto/staff-response.dto';

export class CommentResponseDto {
    @ApiProperty({ example: 1, description: 'ID único del comentario' })
    id: number;

    @ApiProperty({ description: 'Proyecto asociado al comentario (puede ser nulo)', type: ProjectResponseDto, nullable: true })
    project?: ProjectResponseDto;

    @ApiProperty({ description: 'Miembro del staff que hizo el comentario', type: StaffResponseDto })
    staff: StaffResponseDto;

    @ApiProperty({ example: 'Este es un comentario de prueba', description: 'Contenido del comentario' })
    content: string;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Fecha en que se creó el comentario' })
    fecha_creacion: Date;
}
