import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from '../../../tasks/entities/task.entity/task.entity';
//import { Task } from '../../tasks/entities/task.entity';
import { Staff } from '../../../staff/entities/staff.entity/staff.entity';

@Entity('task_assignments')
export class TaskAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })  
  task: Task;

  @ManyToOne(() => Staff, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' }) 
  staff: Staff;

  @Column({ type: 'timestamp' })
  fecha_asignacion: Date;
}
