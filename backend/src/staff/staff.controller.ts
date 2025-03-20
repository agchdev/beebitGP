import { Controller, Get, Post, Body, Param, Put, Delete, HttpException } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity/staff.entity';
import { CreateStaffDto } from './dto/ create-staff.dto';
import { UpdateProjectDto } from 'src/projects/dto/update-project.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  // Obtener todos los miembros del staff
  @Get()
  @ApiOperation({ summary: 'Obtener todos los miembros del staff' })
  @ApiResponse({ status: 200, description: 'Todos los miembros del staff', type: [Staff] })
  async getAllStaff() {
    const staff = await this.staffService.findAll();
    return { status: 200, data: staff }; // Asegura que siempre devuelva un objeto JSON con "status" y "data"
  }
  // Obtener un miembro del staff por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un miembro del staff por ID' })
  @ApiResponse({ status: 200, description: 'Miembro del staff encontrado', type: Staff })
  @ApiResponse({ status: 404, description: 'Miembro del staff no encontrado' })
  async getStaff(@Param('id') id: number) {
    const staff = await this.staffService.findOne(id);
    if (!staff) {
      throw new HttpException({ status: 404, message: 'Miembro del staff no encontrado' }, 404);
    }
    return { status: 200, data: staff };
  }

  // Crear un nuevo miembro del staff
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo miembro del staff' })
  @ApiResponse({ status: 201, description: 'Miembro del staff creado', type: Staff })
  @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    const staff = await this.staffService.create(createStaffDto);
    return { status: 201, data: staff };
  }

  // Actualizar un miembro del staff
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un miembro del staff' })
  @ApiResponse({ status: 200, description: 'Miembro del staff actualizado', type: Staff })
  @ApiResponse({ status: 404, description: 'Miembro del staff no encontrado' })
  @ApiResponse({ status: 400, description: 'Error en la actualización' })
  async updateStaff(@Param('id') id: number, @Body() updateStaffDto: UpdateProjectDto) {
    const updatedStaff = await this.staffService.update(id, updateStaffDto);
    if (!updatedStaff) {
      throw new HttpException({ status: 404, message: 'Miembro del staff no encontrado' }, 404);
    }
    return { status: 200, data: updatedStaff };
  }

  // Eliminar un miembro del staff
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un miembro del staff' })
  @ApiResponse({ status: 200, description: 'Miembro del staff eliminado' })
  @ApiResponse({ status: 404, description: 'Miembro del staff no encontrado' })
  async deleteStaff(@Param('id') id: number) {
    const deleted = await this.staffService.remove(id);
    if (!deleted) {
      throw new HttpException({ status: 404, message: 'Miembro del staff no encontrado' }, 404);
    }
    return { status: 200, message: 'Miembro del staff eliminado correctamente' };
  }
}
