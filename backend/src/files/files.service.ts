import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity/file.entity';
import { Task } from 'src/tasks/entities/task.entity/task.entity';
import { FileResponseDto } from './dto/file-response.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/ update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<FileResponseDto[]> {
    const file = await this.fileRepository.find({ relations: ['task'] });

    const fileResponseDto: FileResponseDto[] = file.map((file) => ({
      id: file.id,
      task: file.task,
      nombre: file.nombre,
      url: file.url,
      fecha_subida: file.fecha_subida,
    }));

    return fileResponseDto;
  }

  async findOne(id: number): Promise<FileResponseDto | null> {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: ['task'],
    });

    if (!file) {
      return null;
    }

    return ({
      id: file.id,
      task: file.task,
      nombre: file.nombre,
      url: file.url,
      fecha_subida: file.fecha_subida,
    })
  }


  async create(fileData: CreateFileDto): Promise<FileResponseDto> {
    const task = await this.taskRepository.findOneBy({ id: fileData.task.id });

    if (!task) {
      throw new Error('Task not found');
    }

    const file = this.fileRepository.create({
      ...fileData, // los tres puntos se utiliza para copiar todas las propiedades del objeto fileData
      task,
    });

    await this.fileRepository.save(file);

    return ({
      id: file.id,
      task: file.task,
      nombre: file.nombre,
      url: file.url,
      fecha_subida: file.fecha_subida, 
    })
  }

  async remove(id: number): Promise<{ status: HttpStatus; message: string }> {
    const deleted = await this.fileRepository.delete(id);
    if (!deleted) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Archivo no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK, message: 'Archivo eliminado correctamente' }; 
  }
}
