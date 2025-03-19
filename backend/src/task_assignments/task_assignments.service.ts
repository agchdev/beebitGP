import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAssignment } from './entities/task_assignment.entity/task_assignment.entity';
import { Task } from 'src/tasks/entities/task.entity/task.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';

@Injectable()
export class TaskAssignmentsService {
  constructor(
    @InjectRepository(TaskAssignment)
  private taskAssignmentRepository: Repository<TaskAssignment>,

  @InjectRepository(Task)
  private taskRepository: Repository<Task>,

  @InjectRepository(Staff)
  private staffRepository: Repository<Staff>,
  ) {}

  async findAll(): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.find({ relations: ['task', 'staff'] });
  }

  async findOne(id: number): Promise<TaskAssignment | null> {
    return await this.taskAssignmentRepository.findOne({ where: { id }, relations: ['task', 'staff'] });
  }

  async create(taskId: number, staffId: number, fecha_asignacion: Date): Promise<TaskAssignment> {
    const task = await this.taskRepository.findOne({where: { id: taskId }});
    const staff = await this.staffRepository.findOne({where: { id: staffId }});

    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
    if (!staff) {
      throw new Error(`Staff with ID ${staffId} not found`);
    }

    const newAssignment = this.taskAssignmentRepository.create({
      task,
      staff,
      fecha_asignacion,
    });

    return await this.taskAssignmentRepository.save(newAssignment);
  }

  async remove(id: number): Promise<void> {
    await this.taskAssignmentRepository.delete(id);
  }
}
