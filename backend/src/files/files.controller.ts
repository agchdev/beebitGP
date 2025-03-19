import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FilesService } from './files.service';
import { File } from './entities/file.entity/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/ update-file.dto';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  async getAllFiles(): Promise<File[]> {
    return this.filesService.findAll();
  }

  @Get(':id')
  async getFile(@Param('id') id: number): Promise<File | null> {
    return this.filesService.findOne(id);
  }

  @Post()
  async createFile(@Body() createFileDto: CreateFileDto): Promise<File> {
    return this.filesService.create(createFileDto);
  }

  @Put(':id')
  async updateFile(@Param('id') id: number, @Body() updateFileDto: UpdateFileDto): Promise<File | null> {
    return this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: number): Promise<void> {
    return this.filesService.remove(id);
  }
}
