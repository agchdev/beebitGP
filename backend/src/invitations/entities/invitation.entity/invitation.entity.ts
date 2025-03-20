import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';
import { ProjectResponseDto } from 'src/projects/dto/project-response.dto';
import { StaffResponseDto } from 'src/staff/dto/staff-response.dto';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proyecto_id' })
  project: ProjectResponseDto;

  @ManyToOne(() => Staff, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id_remitente' })
  sender: StaffResponseDto;

  @ManyToOne(() => Staff, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id_destinatario' })
  recipient: Staff;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'timestamp' })
  fecha_invitacion: Date;
}
