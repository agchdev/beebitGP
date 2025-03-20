import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity/staff.entity';
import { Project } from 'src/projects/entities/project.entity/project.entity';
@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
    ){}

    // Obtener todos los miembros del Staff
    async findAll(): Promise<Staff[]>{
        return await this.staffRepository.find();
    }

    // Obtener miembro solo por ID
    async findOne(id:number): Promise<Staff | null> {
        return await this.staffRepository.findOne({where: {id}});
    }

    // Crear un nuevo miembro del staff
    async create(staffData: Partial<Staff>): Promise<Staff>{
        const newStaff = this.staffRepository.create(staffData);
        return await this.staffRepository.save(newStaff);
    }

    // Actualizar un miembro del staff por ID
  async update(id: number, staffData: Partial<Staff>): Promise<Staff | null> {
    await this.staffRepository.update(id, staffData);
    return this.findOne(id);
  }

  // Eliminar un miembro del staff por ID
  async remove(id: number): Promise<Staff | null> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) return null;
    await this.staffRepository.delete(id);
    return staff;
  }
}
