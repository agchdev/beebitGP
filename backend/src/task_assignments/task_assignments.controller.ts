import { Controller, Get, Post, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TaskAssignmentsService } from './task_assignments.service';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskAssignmentResponseDto } from './dto/task-assignment-response.dto';

@Controller('task-assignments')
export class TaskAssignmentsController {
  constructor(private readonly taskAssignmentsService: TaskAssignmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las asignaciones de tareas' })
  @ApiResponse({ status: 200, description: 'Asignaciones de tareas obtenidas', type: TaskAssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'No se encontraron asignaciones de tareas' })
  async getAllAssignments(): Promise<{ status: HttpStatus; data: TaskAssignmentResponseDto[] }> {
    const taskAssignments = await this.taskAssignmentsService.findAll();

    if (!taskAssignments.length) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron asignaciones de tareas' }, HttpStatus.NOT_FOUND);
    }

    const taskAssignmentsResponse: TaskAssignmentResponseDto[] = taskAssignments.map((taskAssignment) => ({
      id: taskAssignment.id,
      task: taskAssignment.task,
      staff: taskAssignment.staff,
      fecha_asignacion: taskAssignment.fecha_asignacion
    }));  

    return { status: HttpStatus.OK, data: taskAssignmentsResponse };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asignación de tarea por ID' })
  @ApiResponse({ status: 200, description: 'Asignación de tarea encontrada', type: TaskAssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Asignación de tarea no encontrada' })
  async getTaskAssignment(@Param('id') id: number): Promise<{ status: HttpStatus; data: TaskAssignmentResponseDto}> {
      const taskAssignment = await this.taskAssignmentsService.findOne(id);
      
      if (!taskAssignment) {
          throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Asignación de tarea no encontrada' }, 404);
      }

      // Mapear la entidad `TaskAssignment` a `TaskAssignmentResponseDto`
      const taskAssignmentResponse: TaskAssignmentResponseDto = {
          id: taskAssignment.id,
          task: taskAssignment.task,
          staff: taskAssignment.staff,
          fecha_asignacion: taskAssignment.fecha_asignacion
      }

      return { status: HttpStatus.OK, data: taskAssignmentResponse };
  }
  

  @Post()
  @ApiOperation({ summary: 'Crear una nueva asignación de tarea' })
  @ApiResponse({ status: 201, description: 'Asignación de tarea creada', type: TaskAssignmentResponseDto })
  @ApiResponse({ status: 400, description: 'Error al crear la asignación de tarea' })
  async createAssignment(@Body() createTaskAssignmentDto: CreateTaskAssignmentDto):Promise<{status: HttpStatus; data: TaskAssignmentResponseDto}> {
    try {
      const taskAssignment = await this.taskAssignmentsService.create(createTaskAssignmentDto);

      // Mapear la entidad `TaskAssignment` a `TaskAssignmentResponseDto`
      const taskAssignmentResponse: TaskAssignmentResponseDto = {
        id: taskAssignment.id,
        task: taskAssignment.task,
        staff: taskAssignment.staff,
        fecha_asignacion: taskAssignment.fecha_asignacion
      }

      return { status: HttpStatus.CREATED, data: taskAssignmentResponse };
    }catch(error) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear la asignación de tarea' }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteAssignment(@Param('id') id: number): Promise<{ status: HttpStatus; message: string }> {
    const deleted = await this.taskAssignmentsService.remove(id);
    if (!deleted) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Asignación de tarea no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK, message: 'Asignación de tarea eliminada correctamente' };
  }
}
