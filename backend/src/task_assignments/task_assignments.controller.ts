import { Controller, Get, Post, Delete, Param, Body, HttpException } from '@nestjs/common';
import { TaskAssignmentsService } from './task_assignments.service';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskAssignmentResponseDto } from './dto/task-assignment-response.dto';

@Controller('task-assignments')
export class TaskAssignmentsController {
  constructor(private readonly taskAssignmentsService: TaskAssignmentsService) {}

  @Get()
  async getAllAssignments() {
    return this.taskAssignmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asignación de tarea por ID' })
  @ApiResponse({ status: 200, description: 'Asignación de tarea encontrada', type: TaskAssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Asignación de tarea no encontrada' })
  async getTaskAssignment(@Param('id') id: number) {
      const taskAssignment = await this.taskAssignmentsService.findOne(id);
      if (!taskAssignment) {
          throw new HttpException({ status: 404, message: 'Asignación de tarea no encontrada' }, 404);
      }
      return { status: 200, data: taskAssignment };
  }
  

  @Post()
  async createAssignment(@Body() createTaskAssignmentDto: CreateTaskAssignmentDto) {
    return this.taskAssignmentsService.create(
      createTaskAssignmentDto.task,
      createTaskAssignmentDto.staff,
      createTaskAssignmentDto.fecha_asignacion
    );
  }

  @Delete(':id')
  async deleteAssignment(@Param('id') id: number) {
    return this.taskAssignmentsService.remove(id);
  }
}
