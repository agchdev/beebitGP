import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateInvitationDto {
  @IsInt()
  @IsNotEmpty()
  project: number;

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