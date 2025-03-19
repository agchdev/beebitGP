import { IsString, IsOptional, IsUrl, IsDateString } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida.' })
  imagen_url?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato válido.' })
  start_date?: Date;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe tener un formato válido.' })
  end_date?: Date;

  @IsOptional()
  @IsString()
  status?: string;
}
