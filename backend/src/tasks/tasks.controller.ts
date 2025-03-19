import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Obtener todas las tareas
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // Obtener una tarea por ID
  @Get(':id')
  async getTask(@Param('id') id: number): Promise<Task | null> {
    return this.tasksService.findOne(id);
  }
  // Crear una nueva tarea
  @Post()
  async createTask(@Body() taskData: { projectId: number; title: string; descripcion?: string; status: string; fecha_vencimiento?: Date }): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  // Actualizar una tarea
  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() taskData: Partial<Task>): Promise<Task | null> {
    return this.tasksService.update(id, taskData);
  }

  // Eliminar una tarea
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
