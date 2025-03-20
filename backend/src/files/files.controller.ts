import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { FilesService } from './files.service';
import { File } from './entities/file.entity/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/ update-file.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileResponseDto } from './dto/file-response.dto';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los archivos' })
  @ApiResponse({ status: 200, description: 'Archivos obtenidos', type: FileResponseDto })
  @ApiResponse({ status: 404, description: 'No se encontraron archivos' })
  async getAllFiles(): Promise<{ status: HttpStatus; data: FileResponseDto[] }> {
    const files = await this.filesService.findAll();

    if (!files.length) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron archivos' }, HttpStatus.NOT_FOUND);
    }

    const filesResponse: FileResponseDto[] = files.map((file) => ({
      id: file.id,
      task: file.task,
      nombre: file.nombre,
      url: file.url,
      fecha_subida: file.fecha_subida,
    }));

    return { status: HttpStatus.OK, data: filesResponse };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un archivo por ID' })
  @ApiResponse({ status: 200, description: 'Archivo encontrado', type: FileResponseDto })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  async getFile(@Param('id') id: number): Promise<{ status: HttpStatus; data: FileResponseDto }> {
      const file = await this.filesService.findOne(id);

      if (!file) {
        throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Archivo no encontrado' }, HttpStatus.NOT_FOUND);
      }

      // Mapear la entidad `File` a `FileResponseDto`
      const fileResponseDto: FileResponseDto = {
        id: file.id,
        task: file.task,
        nombre: file.nombre,
        url: file.url,
        fecha_subida: file.fecha_subida,
      };

      return { status: HttpStatus.OK, data: fileResponseDto };
  }
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo archivo' })
  @ApiResponse({ status: 201, description: 'Archivo creado', type: FileResponseDto })
  @ApiResponse({ status: 400, description: 'Error al crear el archivo' })
  async createFile(@Body() createFileDto: CreateFileDto): Promise<{ status: HttpStatus; data: FileResponseDto }> {
    try {
      const file = await this.filesService.create(createFileDto);
      
      // Mapear la entidad `File` a `FileResponseDto`
      const fileResponseDto: FileResponseDto = {
        id: file.id,
        task: file.task,
        nombre: file.nombre,
        url: file.url,
        fecha_subida: file.fecha_subida,
      };

      return { status: HttpStatus.CREATED, data: fileResponseDto };

    } catch (error) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear el archivo' }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un archivo por ID' })
  @ApiResponse({ status: 200, description: 'Archivo eliminado' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  async deleteFile(@Param('id') id: number): Promise<{ status: HttpStatus; message: string }> {
    const file = await this.filesService.findOne(id);

    if (!file) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Archivo no encontrado' }, HttpStatus.NOT_FOUND);
    }

    await this.filesService.remove(id);
    return { status: HttpStatus.OK, message: 'Archivo eliminado correctamente' };
  }
}
