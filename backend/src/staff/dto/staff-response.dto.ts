import { ApiProperty } from '@nestjs/swagger';

export class StaffResponseDto {
    @ApiProperty({ example: 5, description: 'ID único del miembro del staff' })
    id: number;

    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del staff' })
    name: string;

    @ApiProperty({ example: 'juan@example.com', description: 'Correo electrónico' })
    email: string;

    @ApiProperty({ example: 'Desarrollador', description: 'Rol dentro de la organización' })
    rol: string;
}
