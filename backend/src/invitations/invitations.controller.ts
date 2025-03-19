import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Invitation } from './entities/invitation.entity/invitation.entity';
import { CreateInvitationDto } from './dto/ create-invitation.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get()
  async getAllInvitations(): Promise<Invitation[]> {
    return this.invitationsService.findAll();
  }

  @Get(':id')
  async getInvitation(@Param('id') id: number): Promise<Invitation | null> {
    return this.invitationsService.findOne(id);
  }

  @Post()
  async createInvitation(@Body() createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    return this.invitationsService.create(createInvitationDto);
  }

  @Put(':id')
  async updateInvitation(@Param('id') id: number, @Body() invitationData: Partial<Invitation>): Promise<Invitation | null> {
    return this.invitationsService.update(id, invitationData);
  }

  @Delete(':id')
  async deleteInvitation(@Param('id') id: number): Promise<void> {
    return this.invitationsService.remove(id);
  }
}
