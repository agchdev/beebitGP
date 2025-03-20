import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity/project.entity';

export class CreateInvitationDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsInt()
  @IsNotEmpty()
  project: Project;

  @ApiProperty({ example: 1, description: 'ID del staff' })
  @IsInt()
  @IsNotEmpty()
  staff_id_remitente: number;

  @ApiProperty({ example: 1, description: 'ID del staff' })
  @IsInt()
  @IsNotEmpty()
  staff_id_destinatario: number;

  @ApiProperty({ example: 'Pendiente', description: 'Estado de la invitación' })
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty({ example: '2022-01-01', description: 'Fecha de invitación' })
  @IsNotEmpty()
  fecha_invitacion: Date;
}