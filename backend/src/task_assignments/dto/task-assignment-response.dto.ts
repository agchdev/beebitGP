import { ApiProperty } from '@nestjs/swagger';
import { TaskResponseDto } from 'src/tasks/dto/task-response.dto';
import { StaffResponseDto } from 'src/staff/dto/staff-response.dto';

export class TaskAssignmentResponseDto {
    @ApiProperty({ example: 1, description: 'ID único de la asignación de tarea' })
    id: number;

    @ApiProperty({ description: 'Tarea asignada', type: TaskResponseDto })
    task: TaskResponseDto;

    @ApiProperty({ description: 'Miembro del staff asignado a la tarea', type: StaffResponseDto })
    staff: StaffResponseDto;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Fecha en que se asignó la tarea' })
    fecha_asignacion: Date;
}
