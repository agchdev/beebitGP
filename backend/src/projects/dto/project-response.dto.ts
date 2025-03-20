import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
    @ApiProperty({ example: 1, description: 'ID único del proyecto' })
    id: number;

    @ApiProperty({ example: 'Proyecto 1', description: 'Nombre del proyecto' })
    name: string;

    @ApiProperty({ example: 'Descripción del proyecto', description: 'Breve descripción' })
    description?: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL de la imagen' })
    image_url?: string;

    @ApiProperty({ example: '2022-01-01', description: 'Fecha de inicio del proyecto' })
    start_date: Date;

    @ApiProperty({ example: '2022-12-31', description: 'Fecha de fin del proyecto' })
    end_date?: Date;

    @ApiProperty({ example: 'Activo', description: 'Estado actual del proyecto' })
    status: string;
}
