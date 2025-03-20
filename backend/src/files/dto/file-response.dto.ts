import { ApiProperty } from '@nestjs/swagger';
import { TaskResponseDto } from 'src/tasks/dto/task-response.dto';

export class FileResponseDto {
    @ApiProperty({ example: 1, description: 'ID único del archivo' })
    id: number;

    @ApiProperty({ description: 'Tarea asociada al archivo', type: TaskResponseDto })
    task: TaskResponseDto;

    @ApiProperty({ example: 'documento.pdf', description: 'Nombre del archivo' })
    nombre: string;

    @ApiProperty({ example: 'https://example.com/uploads/documento.pdf', description: 'URL del archivo' })
    url: string;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Fecha en que se subió el archivo' })
    fecha_subida: Date;
}
