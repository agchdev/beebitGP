import { IsString, IsOptional, IsDateString, IsInt } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsInt({ message: 'El ID del proyecto debe ser un número entero.' })
    proyecto?: number

    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    descripcion?: string

    @IsOptional()
    @IsString()
    status?: string

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de vencimiento debe tener un formato válido.' })
    fecha_vencimiento?: Date
}