import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity/staff.entity';
import { CreateStaffDto } from './dto/ create-staff.dto';
import { UpdateProjectDto } from 'src/projects/dto/update-project.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // Obtener todos los miembros del staff
  @Get()
  async getAllStaff(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  // Obtener un miembro del staff por ID
  @Get(':id')
  async getStaff(@Param('id') id: number): Promise<Staff | null> {
    return this.staffService.findOne(id);
  }

  // Crear un nuevo miembro del staff
  @Post()
  async createStaff(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
    return this.staffService.create(createStaffDto);
  }

  // Actualizar un miembro del staff
  @Put(':id')
  async updateStaff(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<Staff | null> {
    return this.staffService.update(id, updateProjectDto);
  }

  // Eliminar un miembro del staff
  @Delete(':id')
  async deleteStaff(@Param('id') id: number): Promise<void> {
    return this.staffService.remove(id);
  }
}
