import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity/task.entity';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  // Obtener todas las tareas con TaskResponseDto
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.find({ relations: ['proyecto'] });

    // Convertimos las tareas a TaskResponseDto antes de devolverlas
    return tasks.map(task => ({
      id: task.id,
      proyecto: task.proyecto,  // O podrías mapear solo algunos datos del proyecto
      title: task.title,
      descripcion: task.descripcion,
      status: task.status,
      fecha_creacion: task.fecha_creacion,
      fecha_vencimiento: task.fecha_vencimiento,
    }));
  }

  // Obtener una tarea por ID con TaskResponseDto
  async findOne(id: number): Promise<TaskResponseDto | null> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['proyecto'] });

    if (!task) {
      throw new NotFoundException(`La tarea con ID ${id} no existe.`);
    }

    return {
      id: task.id,
      proyecto: task.proyecto,
      title: task.title,
      descripcion: task.descripcion,
      status: task.status,
      fecha_creacion: task.fecha_creacion,
      fecha_vencimiento: task.fecha_vencimiento,
    };
  }

  // Crear una nueva tarea con CreateTaskDto
  async create(createTask: CreateTaskDto): Promise<TaskResponseDto> {
    const proyecto = await this.projectRepository.findOne({ where: { id: createTask.proyecto } });

    if (!proyecto) {
      throw new NotFoundException(`El proyecto con ID ${createTask.proyecto} no existe.`);
    }

    const newTask = this.taskRepository.create({
      ...createTask,
      proyecto, // Asigna el proyecto encontrado
      fecha_creacion: new Date(),
    });

    const savedTask = await this.taskRepository.save(newTask);

    return {
      id: savedTask.id,
      proyecto: savedTask.proyecto,
      title: savedTask.title,
      descripcion: savedTask.descripcion,
      status: savedTask.status,
      fecha_creacion: savedTask.fecha_creacion,
      fecha_vencimiento: savedTask.fecha_vencimiento,
    };
  }

  // Actualizar una tarea con UpdateTaskDto
  async update(id: number, taskData: UpdateTaskDto): Promise<TaskResponseDto | null> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`La tarea con ID ${id} no existe.`);
    }

    await this.taskRepository.update(id, taskData);

    return{
      id: task.id,
      proyecto: task.proyecto,
      title: task.title,
      descripcion: task.descripcion,
      status: task.status,
      fecha_creacion: task.fecha_creacion,
      fecha_vencimiento: task.fecha_vencimiento,
    }
  }

  // Eliminar una tarea
  async remove(id: number): Promise<TaskResponseDto | null> {
    const task = await this.taskRepository.findOne({where: {id}});
    if (!task) return null
    await this.taskRepository.delete(id);
    return task;
  }
}
