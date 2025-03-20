import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDto } from 'src/projects/dto/project-response.dto';
export class TaskResponseDto {
    @ApiProperty({ example: 1, description: 'ID único de la tarea' })
    id: number;

    @ApiProperty({ description: 'Proyecto asociado a la tarea', type: ProjectResponseDto })
    proyecto: ProjectResponseDto;

    @ApiProperty({ example: 'Implementar autenticación', description: 'Título de la tarea' })
    title: string;

    @ApiProperty({ example: 'Desarrollar el sistema de login con JWT', description: 'Descripción de la tarea', nullable: true })
    descripcion?: string;

    @ApiProperty({ example: 'En progreso', description: 'Estado actual de la tarea' })
    status: string;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Fecha en que se creó la tarea' })
    fecha_creacion: Date;

    @ApiProperty({ example: '2024-04-10T12:00:00.000Z', description: 'Fecha de vencimiento de la tarea', nullable: true })
    fecha_vencimiento?: Date;
}
