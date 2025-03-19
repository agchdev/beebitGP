import { IsString, IsNotEmpty, IsOptional, IsUrl, IsDateString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del proyecto es obligatorio.' })
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl({}, {message: 'La imagen debe ser una URL válida.'})
    image_url?: string;

    @IsDateString({}, { message: 'La fecha de inicio debe tener un formato válido.' })
    @IsNotEmpty({ message: 'La fecha de inicio es obligatoria.' })
    start_date: Date;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de fin debe tener un formato válido.' })
    end_date?: Date;

    @IsString()
    @IsNotEmpty({ message: 'El estado del proyecto es obligatorio.' })
    status: string;
}