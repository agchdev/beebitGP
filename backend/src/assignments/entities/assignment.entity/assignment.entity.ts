import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../../projects/entities/project.entity/project.entity';
import { Staff } from '../../../staff/entities/staff.entity/staff.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' }) 
  project: Project;  
  
  @ManyToOne(() => Staff, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' }) 
  staff: Staff;  

  @Column({ type: 'timestamp' })
  fecha_asignacion: Date;
}
