import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity/comment.entity';
import { CreateCommentkDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado', type: CommentResponseDto })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  async getComment(@Param('id') id: number) {
      const comment = await this.commentsService.findOne(id);
      if (!comment) {
          throw new HttpException({ status: 404, message: 'Comentario no encontrado' }, 404);
      }
      return { status: 200, data: comment };
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentkDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Put(':id')
  async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment | null> {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    return this.commentsService.remove(id);
  }
}
