import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentkDto {
    
    @IsInt({ message: 'El ID del proyecto debe ser un número entero.' })
    @IsNotEmpty({ message: 'El ID del proyecto es obligatorio.' })
    projectId: number
    
    @IsInt({ message: 'El ID del staff debe ser un número entero.' })
    @IsNotEmpty({ message: 'El ID del staff es obligatorio.' })
    staffId: number
    
    @IsString()
    @IsNotEmpty({ message: 'El contenido es obligatorio.' })
    content: string

    @IsDateString({}, { message: 'La fecha de creación debe tener un formato válido.' })
    @IsNotEmpty({ message: 'La fecha de creación es obligatoria.' })
    fecha_creacion: Date
}