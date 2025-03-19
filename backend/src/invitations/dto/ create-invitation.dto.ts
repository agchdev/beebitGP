import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity/project.entity';

export class CreateInvitationDto {
  @IsInt()
  @IsNotEmpty()
  project: Project;

  @IsInt()
  @IsNotEmpty()
  staff_id_remitente: number;

  @IsInt()
  @IsNotEmpty()
  staff_id_destinatario: number;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  fecha_invitacion: Date;
}