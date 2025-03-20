import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity/staff.entity';
import { CreateStaffDto } from './dto/ create-staff.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaffResponseDto } from './dto/staff-response.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  // Obtener todos los miembros del staff
  @Get()
  @ApiOperation({ summary: 'Obtener todos los miembros del staff' })
  @ApiResponse({ status: 200, description: 'Todos los miembros del staff', type: [StaffResponseDto] })
  async getAllStaff(): Promise<{ status: number; data: StaffResponseDto[] }> {
    const staff = await this.staffService.findAll();

    // Manejo de error si no hay miembros en la base de datos
    if (!staff.length) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron miembros del staff' }, HttpStatus.NOT_FOUND);
    }

    // Manejar la lista de `Project` a `ProjectResponseDto[]`
    const staffResponse: StaffResponseDto[] = staff.map(staff => ({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      rol: staff.rol,
    }));

    return { status: 200, data: staffResponse }; // Asegura que siempre devuelva un objeto JSON con "status" y "data"
  }

  // Obtener un miembro del staff por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un miembro del staff por ID' })
  @ApiResponse({ status: 200, description: 'Miembro del staff encontrado', type: StaffResponseDto })
  @ApiResponse({ status: 404, description: 'Miembro del staff no encontrado' })
  async getStaff(@Param('id') id: number): Promise<{ status: number; data: StaffResponseDto }> {
    const staff = await this.staffService.findOne(id);

    if (!staff) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Miembro del staff no encontrado' }, 404);
    }

    // Mapear la entidad `Project` a `ProjectResponseDto`
    const staffResponseDto: StaffResponseDto = {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      rol: staff.rol,
    }

    return { status: HttpStatus.OK, data: staffResponseDto };
  }

  // Crear un nuevo miembro del staff
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo miembro del staff' })
  @ApiResponse({ status: 201, description: 'Miembro del staff creado', type: StaffResponseDto })
  @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    try {
      const staff = await this.staffService.create(createStaffDto);

      // Mapear la entidad `Project` a `ProjectResponseDto`
      const staffResponseDto: StaffResponseDto = {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        rol: staff.rol,
      }

      return { status: HttpStatus.CREATED, data: staffResponseDto };
    } catch (error) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear el proyecto' }, HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un miembro del staff
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un miembro del staff' })
  @ApiResponse({ status: 200, description: 'Miembro del staff actualizado', type: StaffResponseDto })
  @ApiResponse({ status: 404, description: 'Miembro del staff no encontrado' })
  async updateStaff(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto
  ): Promise<{ status: number; data: Staff }> {
    const updatedStaff = await this.staffService.update(id, updateStaffDto);
    if (!updatedStaff) {
      throw new HttpException({ status: HttpStatus.OK, message: 'Miembro del staff no encontrado' }, 404);
    }

    // Mapear la entidad `Project` a `ProjectResponseDto`
    const staffResponse: StaffResponseDto = {
      id: updatedStaff.id,
      name: updatedStaff.name,
      email: updatedStaff.email,
      rol: updatedStaff.rol,
    }

    return { status: HttpStatus.OK, data: staffResponse };
  }

  // Eliminar un miembro del staff
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un miembro del staff' })
  @ApiResponse({ status: 200, description: 'Miembro del staff eliminado' })
  @ApiResponse({ status: 404, description: 'Miembro del staff no encontrado' })
  async deleteStaff(@Param('id') id: number): Promise<{ status: HttpStatus; message: string }> {
    const deleted = await this.staffService.remove(id);
    if (!deleted) {
      throw new HttpException({ status: 404, message: 'Miembro del staff no encontrado' }, 404);
    }
    return { status: HttpStatus.OK, message: 'Miembro del staff eliminado correctamente' };
  }
}
