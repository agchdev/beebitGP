import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity/task.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskResponseDto } from './dto/task-response.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Obtener todas las tareas
  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Tareas encontradas', type: TaskResponseDto })
  @ApiResponse({ status: 404, description: 'No se encontraron tareas' })
  async getAllTasks(): Promise<{ status: HttpStatus, data: TaskResponseDto[] }> {
    
    const tasks = await this.tasksService.findAll();

    if (!tasks.length) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron tareas' }, HttpStatus.NOT_FOUND);
    }

    const tasksResponse: TaskResponseDto[] = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      descripcion: task.descripcion,
      status: task.status,
      fecha_creacion: task.fecha_creacion,
      fecha_vencimiento: task.fecha_vencimiento,
      proyecto: task.proyecto
    }));
    
    return {status: HttpStatus.OK, data: tasksResponse};
  }

  // Obtener una tarea por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: TaskResponseDto })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  async getTask(@Param('id') id: number): Promise<{ status: HttpStatus; data: TaskResponseDto}> {
      const task = await this.tasksService.findOne(id);
      if (!task) {
          throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Tarea no encontrada' }, HttpStatus.NOT_FOUND);
      }

      // Mapear la entidad `Task` a `TaskResponseDto`
      const taskResponse: TaskResponseDto = {
          id: task.id,
          title: task.title,
          descripcion: task.descripcion,
          status: task.status,
          fecha_creacion: task.fecha_creacion,
          fecha_vencimiento: task.fecha_vencimiento,
          proyecto: task.proyecto
      }

      return { status: HttpStatus.OK, data: taskResponse };
  }
  // Crear una nueva tarea
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<{ status: HttpStatus; data: TaskResponseDto}> {
    try {
      const task = await this.tasksService.create(createTaskDto);

      // Mapear la entidad `Task` a `TaskResponseDto`
      const taskResponse: TaskResponseDto = {
        id: task.id,
        title: task.title,
        descripcion: task.descripcion,
        status: task.status,
        fecha_creacion: task.fecha_creacion,
        fecha_vencimiento: task.fecha_vencimiento,
        proyecto: task.proyecto
      }

      return { status: HttpStatus.CREATED, data: taskResponse };

    } catch (error) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear la tarea' }, HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar una tarea
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada', type: TaskResponseDto })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: Partial<UpdateTaskDto>
  ): Promise<{ status: HttpStatus; data: TaskResponseDto}> {
    
    const updateTask = await this.tasksService.update(id, updateTaskDto);
    
    if (!updateTask) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Tarea no encontrada' }, HttpStatus.NOT_FOUND);
    }

    // Mapear la entidad `Task` a `TaskResponseDto`
    const taskResponse: TaskResponseDto = {
      id: updateTask.id,
      title: updateTask.title,
      descripcion: updateTask.descripcion,
      status: updateTask.status,
      fecha_creacion: updateTask.fecha_creacion,
      fecha_vencimiento: updateTask.fecha_vencimiento,
      proyecto: updateTask.proyecto
    }

    return { status: HttpStatus.OK, data: taskResponse };

  }

  // Eliminar una tarea
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  async deleteTask(@Param('id') id: number): Promise<{ status: HttpStatus; message: string }> {
    const deleted = await this.tasksService.remove(id);
    if (!deleted) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Tarea no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK, message: 'Tarea eliminada correctamente' };
  }
}
