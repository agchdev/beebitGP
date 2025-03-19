import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity/invitation.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
  ) {}

  async findAll(): Promise<Invitation[]> {
    return await this.invitationRepository.find({ relations: ['project', 'sender', 'recipient'] });
  }

  async findOne(id: number): Promise<Invitation | null> {
    return await this.invitationRepository.findOne({ where: { id }, relations: ['project', 'sender', 'recipient'] });
  }

  async create(invitationData: Partial<Invitation>): Promise<Invitation> {
    const newInvitation = this.invitationRepository.create(invitationData);
    return await this.invitationRepository.save(newInvitation);
  }

  async update(id: number, invitationData: Partial<Invitation>): Promise<Invitation | null> {
    await this.invitationRepository.update(id, invitationData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.invitationRepository.delete(id);
  }
}
