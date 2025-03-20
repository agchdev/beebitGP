import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity/staff.entity';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { StaffResponseDto } from './dto/staff-response.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { CreateStaffDto } from './dto/ create-staff.dto';
@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) { }

  // Obtener todos los miembros del Staff
  async findAll(): Promise<StaffResponseDto[]> {
    const staff = await this.staffRepository.find();

    return staff.map(staff => ({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      rol: staff.rol,
    }));

  }

  // Obtener miembro solo por ID
  async findOne(id: number): Promise<StaffResponseDto | null> {
    const staff = await this.staffRepository.findOne({ where: { id } });

    if (!staff) throw new NotFoundException(`La tarea con ID ${id} no existe.`);

    return {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      rol: staff.rol,
    };
  }

  // Crear un nuevo miembro del staff
  async create(createStaffDto: CreateStaffDto): Promise<StaffResponseDto> {
    const newStaff = this.staffRepository.create(createStaffDto);
    const savedStaff = await this.staffRepository.save(newStaff);
    return {
      id: savedStaff.id,
      name: savedStaff.name,
      email: savedStaff.email,
      rol: savedStaff.rol,
    };
  }

  // Actualizar un miembro del staff por ID
  async update(id: number, updateStaffDto: UpdateStaffDto): Promise<StaffResponseDto | null> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`Staff con ID ${id} no encontrado`);
    }

    await this.staffRepository.update(id, updateStaffDto);

    return {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      rol: staff.rol,
    };
  }

  // Eliminar un miembro del staff por ID
  async remove(id: number): Promise<{ message: string }> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`Staff con ID ${id} no encontrado`);
    }
    await this.staffRepository.remove(staff);
    return { message: 'Miembro del staff eliminado correctamente' };
  }
}
