import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './entities/assignment.entity/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentResponseDto } from './dto/assignment-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Obtener todas las asignaciones
  @Get()
  @ApiOperation({ summary: 'Obtener todas las asignaciones' })
  @ApiResponse({ status: 200, description: 'OK', type: [AssignmentResponseDto] })
  @ApiResponse({ status: 404, description: 'No se encontraron miembros del staff' })
  async getAllAssignments(): Promise<{ status: HttpStatus; data: AssignmentResponseDto[] }> {
    const assignments = await this.assignmentsService.findAll();

    console.log("assignments", assignments)

    // Manejo de error si no hay miembros en la base de datos
    if (!assignments.length) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron miembros del staff' }, HttpStatus.NOT_FOUND);
    }

    // Mapear la lista de `Assignment` a `AssignmentResponseDto[]`
    const assignmentsResponse: AssignmentResponseDto[] = assignments.map(assignment => ({
      id: assignment.id,
      project: assignment.project,
      staff: assignment.staff,
      fecha_asignacion: assignment.fecha_asignacion
    }))

    return { status: HttpStatus.OK, data: assignmentsResponse };
  }

  // Obtener asignaciones por ID de usuario
  @Get('/user/:id')
  @ApiOperation({ summary: 'Obtener asignaciones por ID de usuario' })
  @ApiResponse({ status: 200, description: 'OK', type: [AssignmentResponseDto] })
  @ApiResponse({ status: 404, description: 'No se encontraron miembros del staff' })
  async getAssignmentsByUserId(@Param('id') id: string): Promise<{ status: HttpStatus; data: AssignmentResponseDto[] }> {
    const userId = parseInt(id, 10); // <-- Convertimos a número

    if (isNaN(userId)) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'ID inválido' }, HttpStatus.BAD_REQUEST);
    }

    const assignments = await this.assignmentsService.findAllByUserId(userId);
    console.log("Asignaciones encontradas:", assignments); // ✅ Verifica la salida

    if (!assignments || assignments.length === 0) { // ⬅️ Asegurar que es un array
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron miembros del staff' }, HttpStatus.NOT_FOUND);
    }

    // Manejo de error si no hay miembros en la base de datos
    if (!assignments.length) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron miembros del staff' }, HttpStatus.NOT_FOUND);
    } 

    // Mapear la lista de `Assignment` a `AssignmentResponseDto[]`
    const assignmentsResponse: AssignmentResponseDto[] = assignments.map(assignment => ({
      id: assignment.id,
      project: assignment.project,
      staff: assignment.staff,
      fecha_asignacion: assignment.fecha_asignacion
    }))

    return { status: HttpStatus.OK, data: assignmentsResponse };
  }

  // Obtener una asignación por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asignación por ID' })
  @ApiResponse({ status: 200, description: 'OK', type: AssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  async getAssignment(@Param('id') id: number): Promise<{ status: number; data: AssignmentResponseDto }> {
    
    const assignment = await this.assignmentsService.findOne(id);

    if (!assignment) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Asignación no encontrada' }, HttpStatus.NOT_FOUND);
    }

    // Mapear la entidad `Assignment` a `AssignmentResponseDto`
    const assignmentsResponse: AssignmentResponseDto = {
      id: assignment.id,
      project: assignment.project,
      staff: assignment.staff,
      fecha_asignacion: assignment.fecha_asignacion
    }
    
    return { status: HttpStatus.OK, data: assignmentsResponse };
  }

  // Crear una nueva asignación
  @Post()
  @ApiOperation({ summary: 'Crear una nueva asignación' })
  @ApiResponse({ status: 201, description: 'CREATED', type: AssignmentResponseDto })
  @ApiResponse({ status: 400, description: 'Error al crear el proyecto' })
  async createAssignment(@Body() createAssignmentDto: CreateAssignmentDto): Promise<{ status: HttpStatus; data: AssignmentResponseDto }> {
    try{
      const assignment = await this.assignmentsService.create(createAssignmentDto);
  
      // Mapear la entidad `Assignment` a `AssignmentResponseDto`
      const assignmentsResponse: AssignmentResponseDto = {
        id: assignment.id,
        project: assignment.project,
        staff: assignment.staff,
        fecha_asignacion: assignment.fecha_asignacion
      }
      
      return { status: HttpStatus.CREATED, data: assignmentsResponse };
    }catch(error){
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear el proyecto' }, HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar una asignación
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una asignación' })
  @ApiResponse({ status: 200, description: 'OK', type: AssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  async updateAssignment(
    @Param('id') id: number, 
    @Body() updateAssigmentDto: UpdateAssignmentDto
  ): Promise<{ status: HttpStatus; data: AssignmentResponseDto }> {
    
    const updateAssigment = await this.assignmentsService.update(id, updateAssigmentDto);

    if(!updateAssigment) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Asignación no encontrada' }, HttpStatus.NOT_FOUND);
    }

    // Mapear la entidad `Assignment` a `AssignmentResponseDto`
    const assignmentsResponse: AssignmentResponseDto = {
      id: updateAssigment.id,
      project: updateAssigment.project,
      staff: updateAssigment.staff,
      fecha_asignacion: updateAssigment.fecha_asignacion
    }
    
    return { status: HttpStatus.OK, data: assignmentsResponse }
  }

  // Eliminar una asignación
  @Delete(':id')
  async deleteAssignment(@Param('id') id: number): Promise<{ status: HttpStatus; message: string }> {
    
    const deleteAssignment = await this.assignmentsService.remove(id);

    if(!deleteAssignment) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Asignación no encontrada' }, HttpStatus.NOT_FOUND);
    }
    
    return { status: HttpStatus.OK, message: 'Asignación eliminada correctamente' };
  }
}
