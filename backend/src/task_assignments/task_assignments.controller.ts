import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TaskAssignmentsService } from './task_assignments.service';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';

@Controller('task-assignments')
export class TaskAssignmentsController {
  constructor(private readonly taskAssignmentsService: TaskAssignmentsService) {}

  @Get()
  async getAllAssignments() {
    return this.taskAssignmentsService.findAll();
  }

  @Get(':id')
  async getAssignment(@Param('id') id: number) {
    return this.taskAssignmentsService.findOne(id);
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
