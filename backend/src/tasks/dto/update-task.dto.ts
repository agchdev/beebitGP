import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDateString, IsInt } from "class-validator";

export class UpdateTaskDto {
    @ApiProperty({ example: 1, description: 'ID del proyecto' })
    @IsOptional()
    @IsInt({ message: 'El ID del proyecto debe ser un número entero.' })
    proyecto?: number

    @ApiProperty({ example: 'Tarea 1', description: 'TitledBorder de la tarea' })
    @IsOptional()
    @IsString()
    title?: string

    @ApiProperty({ example: 'Descripción de la tarea', description: 'Descripción de la tarea' })
    @IsOptional()
    @IsString()
    descripcion?: string

    @ApiProperty({ example: 'Pendiente', description: 'Estado de la tarea' })
    @IsOptional()
    @IsString()
    status?: string

    @ApiProperty({ example: '2022-01-01', description: 'Fecha de creación' })
    @IsOptional()
    @IsDateString({}, { message: 'La fecha de vencimiento debe tener un formato válido.' })
    fecha_vencimiento?: Date
}