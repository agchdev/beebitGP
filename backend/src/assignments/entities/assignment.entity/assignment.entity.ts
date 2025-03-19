import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../../projects/entities/project.entity/project.entity';
import { Staff } from '../../../staff/entities/staff.entity/staff.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })  // Definir la clave foránea en la base de datos
  projectId: Project;

  @ManyToOne(() => Staff, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' })  // Definir la clave foránea en la base de datos
  staffId: Staff;

  @Column({ type: 'timestamp' })
  fecha_asignacion: Date;
}
