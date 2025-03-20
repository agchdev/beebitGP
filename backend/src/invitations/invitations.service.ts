import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity/invitation.entity';
import { CreateInvitationDto } from './dto/ create-invitation.dto';
import { InvitationResponseDto } from './dto/invitation-response.dto';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
  ) {}

  async findAll(): Promise<InvitationResponseDto[]> {
    const invitations = await this.invitationRepository.find({ relations: ['project', 'sender', 'recipient'] });

    return invitations.map(invitation => ({
      id: invitation.id,
      project: invitation.project,
      sender: invitation.sender,
      recipient: invitation.recipient,
      status: invitation.status,
      fecha_invitacion: invitation.fecha_invitacion,
    }));
  }

  async findOne(id: number): Promise<InvitationResponseDto | null> {
    const invitation = await this.invitationRepository.findOne({ where: { id }, relations: ['project', 'sender', 'recipient'] });

    if (!invitation) {
      throw new NotFoundException(`Invitación con ID ${id} no encontrada`);
    }

    return {
      id: invitation.id,
      project: invitation.project,
      sender: invitation.sender,
      recipient: invitation.recipient,
      status: invitation.status,
      fecha_invitacion: invitation.fecha_invitacion,
    };
  }

  async create(invitationData: CreateInvitationDto): Promise<InvitationResponseDto> {
    const newInvitation = this.invitationRepository.create(invitationData);
    const savedInvitation = await this.invitationRepository.save(newInvitation);

    return {
      id: savedInvitation.id,
      project: savedInvitation.project,
      sender: savedInvitation.sender,
      recipient: savedInvitation.recipient,
      status: savedInvitation.status,
      fecha_invitacion: savedInvitation.fecha_invitacion,
    };
  }


  async remove(id: number): Promise<InvitationResponseDto | null> {
    const invitation = await this.findOne(id);
    if (!invitation) return null;
    await this.invitationRepository.delete(id);
    return invitation;
  }
}
