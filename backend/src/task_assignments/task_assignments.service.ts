import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAssignment } from './entities/task_assignment.entity/task_assignment.entity';
import { Task } from 'src/tasks/entities/task.entity/task.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { TaskAssignmentResponseDto } from './dto/task-assignment-response.dto';

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

  async findAll(): Promise<TaskAssignmentResponseDto[]> {
    const assignments = await this.taskAssignmentRepository.find({ relations: ['task', 'staff'] });

    return assignments.map((assignment) => ({
      id: assignment.id,
      task: assignment.task, 
      staff: assignment.staff,
      fecha_asignacion: assignment.fecha_asignacion,
    }));
  }

  async findOne(id: number): Promise<TaskAssignmentResponseDto> {
    const assignment = await this.taskAssignmentRepository.findOne({ where: { id }, relations: ['task', 'staff'] });

    if (!assignment) {
      throw new NotFoundException(`Task Assignment with ID ${id} not found`);
    }

    return {
      id: assignment.id,
      task: assignment.task,
      staff: assignment.staff,
      fecha_asignacion: assignment.fecha_asignacion,
    };
  }

  async create(createTaskAssignmentDto: CreateTaskAssignmentDto): Promise<TaskAssignmentResponseDto> {

    const task = await this.taskRepository.findOne({ where: { id: createTaskAssignmentDto.task } });
    const staff = await this.staffRepository.findOne({ where: { id: createTaskAssignmentDto.staff } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${createTaskAssignmentDto.task} not found`);
    }
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${createTaskAssignmentDto.staff} not found`);
    }

    const newAssignment = this.taskAssignmentRepository.create({
      task,
      staff,
      fecha_asignacion: createTaskAssignmentDto.fecha_asignacion,
    });

    const savedAssignment = await this.taskAssignmentRepository.save(newAssignment);

    return {
      id: savedAssignment.id,
      task: savedAssignment.task,
      staff: savedAssignment.staff,
      fecha_asignacion: savedAssignment.fecha_asignacion,
    };
  }

  async remove(id: number): Promise<TaskAssignment | null> {
    const assignment = await this.taskAssignmentRepository.findOne({ where: { id } });
    if (!assignment) return null;
    await this.taskAssignmentRepository.delete(id);
    return assignment;
  }
}
