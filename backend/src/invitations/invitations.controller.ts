import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Invitation } from './entities/invitation.entity/invitation.entity';
import { CreateInvitationDto } from './dto/ create-invitation.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvitationResponseDto } from './dto/invitation-response.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las invitaciones' })
  @ApiResponse({ status: 200, description: 'Todas las invitaciones', type: [InvitationResponseDto] })
  @ApiResponse({ status: 404, description: 'No se encontraron invitaciones' })
  async getAllInvitations(): Promise<{ status: HttpStatus; data: InvitationResponseDto[] }> {
    const invitations = await this.invitationsService.findAll();
    if (invitations.length === 0) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron invitaciones' }, HttpStatus.NOT_FOUND);
    }

    // Mapear la lista de `Invitation` a `InvitationResponseDto[]`
    const invitationsResponseDto: InvitationResponseDto[] = invitations.map(invitation => ({
      id: invitation.id,
      project: invitation.project,
      sender: invitation.sender,
      recipient: invitation.recipient,
      status: invitation.status,
      fecha_invitacion: invitation.fecha_invitacion,
    }));

    return { status: HttpStatus.OK, data: invitationsResponseDto };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una invitación por ID' })
  @ApiResponse({ status: 200, description: 'Invitación encontrada', type: InvitationResponseDto })
  @ApiResponse({ status: 404, description: 'Invitación no encontrada' })
  async getInvitation(@Param('id') id: number): Promise<{ status: HttpStatus; data: InvitationResponseDto }> {

    const invitation = await this.invitationsService.findOne(id);

    if (!invitation) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Invitación no encontrada' }, HttpStatus.NOT_FOUND);
    }

    // Mapear `Invitation` a `InvitationResponseDto`
    const invitationResponseDto: InvitationResponseDto = {
      id: invitation.id,
      project: invitation.project,
      sender: invitation.sender,
      recipient: invitation.recipient,
      status: invitation.status,
      fecha_invitacion: invitation.fecha_invitacion,
    };

    return { status: HttpStatus.OK, data: invitationResponseDto };
  }


  @Post()
  @ApiOperation({ summary: 'Crear una nueva invitación' })
  @ApiResponse({ status: 201, description: 'Invitación creada', type: InvitationResponseDto })
  @ApiResponse({ status: 400, description: 'Error al crear la invitación' })
  async createInvitation(@Body() createInvitationDto: CreateInvitationDto): Promise<{ status: HttpStatus; data: InvitationResponseDto }> {
    try {
      const invitation = await this.invitationsService.create(createInvitationDto);

      // Mapear la entidad `Invitation` a `InvitationResponseDto`
      const invitationResponseDto: InvitationResponseDto = {
        id: invitation.id,
        project: invitation.project,
        sender: invitation.sender,
        recipient: invitation.recipient,
        status: invitation.status,
        fecha_invitacion: invitation.fecha_invitacion,
      };

      return { status: HttpStatus.CREATED, data: invitationResponseDto };
    } catch (error) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear la invitación' }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una invitación' })
  @ApiResponse({ status: 200, description: 'Invitación eliminada' })
  @ApiResponse({ status: 404, description: 'Invitación no encontrada' })
  async deleteInvitation(@Param('id') id: number): Promise<{ status: HttpStatus; message: string }> {
    const deleted = await this.invitationsService.remove(id);
    if (!deleted) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Invitación no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK, message: 'Invitación eliminada' };
  }
}
