import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  // Obtener todas las asignaciones
  async findAll(): Promise<Assignment[]> {
    return await this.assignmentRepository.find();
  }

  // Obtener una asignación por ID
  async findOne(id: number): Promise<Assignment | null> {
    return await this.assignmentRepository.findOne({ where: { id } });
  }

  // Crear una nueva asignación
  async create(assignmentData: Partial<Assignment>): Promise<Assignment> {
    const newAssignment = this.assignmentRepository.create(assignmentData);
    return await this.assignmentRepository.save(newAssignment);
  }

  // Actualizar una asignación por ID
  async update(id: number, assignmentData: Partial<Assignment>): Promise<Assignment | null> {
    await this.assignmentRepository.update(id, assignmentData);
    return this.findOne(id);
  }

  // Eliminar una asignación por ID
  async remove(id: number): Promise<void> {
    await this.assignmentRepository.delete(id);
  }
}
