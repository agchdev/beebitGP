import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity/task.entity';
import { Project } from 'src/projects/entities/project.entity/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  // Obtener todas las tareas
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['proyecto'] });
  }

  // Obtener una tarea por ID
  async findOne(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({ where: { id }, relations: ['proyecto'] });
  }

  // Crear una nueva tarea (necesita un `projectId`)
  async create(taskData: { projectId: number; title: string; descripcion?: string; status: string; fecha_vencimiento?: Date }): Promise<Task> {
    const proyecto = await this.projectRepository.findOne({ where: { id: taskData.projectId } });

    if (!proyecto) {
      throw new NotFoundException(`El proyecto con ID ${taskData.projectId} no existe.`);
    }

    const newTask = this.taskRepository.create({
      ...taskData,
      proyecto, // Asigna el proyecto encontrado
      fecha_creacion: new Date(),
    });

    return await this.taskRepository.save(newTask);
  }

  // Actualizar una tarea
  async update(id: number, taskData: Partial<Task>): Promise<Task | null> {
    await this.taskRepository.update(id, taskData);
    return this.findOne(id);
  }

  // Eliminar una tarea
  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
