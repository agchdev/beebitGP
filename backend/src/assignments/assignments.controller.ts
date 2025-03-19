import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './entities/assignment.entity/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Obtener todas las asignaciones
  @Get()
  async getAllAssignments(): Promise<Assignment[]> {
    return this.assignmentsService.findAll();
  }

  // Obtener una asignación por ID
  @Get(':id')
  async getAssignment(@Param('id') id: number): Promise<Assignment | null> {
    return this.assignmentsService.findOne(id);
  }

  // Crear una nueva asignación
  @Post()
  async createAssignment(@Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentsService.create(createAssignmentDto);
  }

  // Actualizar una asignación
  @Put(':id')
  async updateAssignment(@Param('id') id: number, @Body() updateAssigmentDto: UpdateAssignmentDto): Promise<Assignment | null> {
    return this.assignmentsService.update(id, updateAssigmentDto);
  }

  // Eliminar una asignación
  @Delete(':id')
  async deleteAssignment(@Param('id') id: number): Promise<void> {
    return this.assignmentsService.remove(id);
  }
}
