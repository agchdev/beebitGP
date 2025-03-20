import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity/comment.entity';
import { CreateCommentkDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({ status: 200, description: 'Comentarios encontrados', type: [CommentResponseDto] })
  @ApiResponse({ status: 404, description: 'No se encontraron comentarios' })
  async getAllComments(): Promise<{ status: HttpStatus; data: CommentResponseDto[] }> {
    const comments = await this.commentsService.findAll();

    // Manejo de error si no hay miembros en la base de datos
    if (!comments.length) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron miembros del staff' }, HttpStatus.NOT_FOUND);
    }

    // Mapear la lista de `Project` a `ProjectResponseDto[]`
    const commentsResponseDto: CommentResponseDto[] = comments.map(comment => ({
      id: comment.id,
      project: comment.project,
      staff: comment.staff,
      content: comment.content,
      fecha_creacion: comment.fecha_creacion,
    }));

    return { status: HttpStatus.OK, data: commentsResponseDto };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado', type: CommentResponseDto })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  async getComment(@Param('id') id: number): Promise<{ status: HttpStatus; data: CommentResponseDto }> {
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Comentario no encontrado' }, 404);
    }

    // Mapear la entidad `Project` a `ProjectResponseDto`
    const commentResponseDto: CommentResponseDto = {
      id: comment.id,
      project: comment.project,
      staff: comment.staff,
      content: comment.content,
      fecha_creacion: comment.fecha_creacion,
    };

    return { status: HttpStatus.OK, data: commentResponseDto };
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({ status: 201, description: 'Comentario creado', type: CommentResponseDto })
  @ApiResponse({ status: 400, description: 'Error al crear el comentario' })
  async createComment(@Body() createCommentDto: CreateCommentkDto): Promise<{ status: HttpStatus; data: CommentResponseDto }> {
    try {
      const comment = await this.commentsService.create(createCommentDto);

      // Mapear la entidad `Project` a `ProjectResponseDto`
      const commentResponseDto: CommentResponseDto = {
        id: comment.id,
        project: comment.project,
        staff: comment.staff,
        content: comment.content,
        fecha_creacion: comment.fecha_creacion,
      };

      return { status: HttpStatus.CREATED, data: commentResponseDto };
    } catch (error) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear el proyecto' }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario eliminado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  async deleteComment(@Param('id') id: number): Promise<{ status: HttpStatus; message: string }> {
    const deleted = await this.commentsService.remove(id);
    if (!deleted) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Comentario no encontrado' }, 404);
    }
    return { status: HttpStatus.OK, message: 'Comentario eliminado correctamente' };
  }
}
