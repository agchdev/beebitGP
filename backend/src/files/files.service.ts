import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async findAll(): Promise<File[]> {
    return await this.fileRepository.find({ relations: ['task'] });
  }

  async findOne(id: number): Promise<File | null> {
    return await this.fileRepository.findOne({ where: { id }, relations: ['project'] });
  }

  async create(fileData: Partial<File>): Promise<File> {
    const newFile = this.fileRepository.create(fileData);
    return await this.fileRepository.save(newFile);
  }

  async update(id: number, fileData: Partial<File>): Promise<File | null> {
    await this.fileRepository.update(id, fileData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.fileRepository.delete(id);
  }
}
