import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentResponseDto } from './dto/assignment-response.dto';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  // Obtener todas las asignaciones
  async findAll(): Promise<AssignmentResponseDto[]> {
    const assignments = await this.assignmentRepository.find({ relations: ['projectId', 'staffId'] });
    
    return assignments.map(assignment => ({
      id: assignment.id,
      projectId: assignment.projectId.id,
      staffId: assignment.staffId.id,
      fecha_asignacion: assignment.fecha_asignacion,
    }));
  }

  // Obtener una asignación por ID
  async findOne(id: number): Promise<AssignmentResponseDto | null> {
    const assignment = await this.assignmentRepository.findOne({ where: { id }, relations: ['projectId', 'staffId'] });
    
    if (!assignment) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }

    return {
      id: assignment.id,
      projectId: assignment.projectId.id,
      staffId: assignment.staffId.id,
      fecha_asignacion: assignment.fecha_asignacion,
    };
  }

  // Crear una nueva asignación
  async create(createAssignmentDto: CreateAssignmentDto): Promise<AssignmentResponseDto> {
    const project = await this.projectRepository.findOne({ where: { id: createAssignmentDto.projectId } });
    const staff = await this.staffRepository.findOne({ where: { id: createAssignmentDto.staffId } });

    if (!project) {
      throw new NotFoundException(`El proyecto con ID ${createAssignmentDto.projectId} no existe.`);
    }
    if (!staff) {
      throw new NotFoundException(`El miembro del staff con ID ${createAssignmentDto.staffId} no existe.`);
    }

    const newAssignment = this.assignmentRepository.create({
      projectId: project,
      staffId: staff,
      fecha_asignacion: createAssignmentDto.fecha_asignacion,
    });

    const savedAssignment = await this.assignmentRepository.save(newAssignment);

    return {
      id: savedAssignment.id,
      projectId: savedAssignment.projectId.id,
      staffId: savedAssignment.staffId.id,
      fecha_asignacion: savedAssignment.fecha_asignacion,
    };
  }

  // Actualizar una asignación por ID
  async update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<AssignmentResponseDto | null> {
    const assignment = await this.assignmentRepository.findOne({ where: { id }, relations: ['projectId', 'staffId'] });

    if (!assignment) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }

    if (updateAssignmentDto.projectId) {
      const project = await this.projectRepository.findOne({ where: { id: updateAssignmentDto.projectId } });
      if (!project) {
        throw new NotFoundException(`El proyecto con ID ${updateAssignmentDto.projectId} no existe.`);
      }
      assignment.projectId = project;
    }

    if (updateAssignmentDto.staffId) {
      const staff = await this.staffRepository.findOne({ where: { id: updateAssignmentDto.staffId } });
      if (!staff) {
        throw new NotFoundException(`El miembro del staff con ID ${updateAssignmentDto.staffId} no existe.`);
      }
      assignment.staffId = staff;
    }

    if (updateAssignmentDto.fecha_asignacion) {
      assignment.fecha_asignacion = updateAssignmentDto.fecha_asignacion;
    }

    await this.assignmentRepository.save(assignment);

    return {
      id: assignment.id,
      projectId: assignment.projectId.id,
      staffId: assignment.staffId.id,
      fecha_asignacion: assignment.fecha_asignacion,
    };
  }

  // Eliminar una asignación por ID
  async remove(id: number): Promise<{ message: string }> {
    const assignment = await this.assignmentRepository.findOne({ where: { id } });

    if (!assignment) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }

    await this.assignmentRepository.remove(assignment);
    return { message: `Asignación con ID ${id} eliminada correctamente` };
  }
}
