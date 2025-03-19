import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity/comment.entity';
import { CreateCommentkDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async getComment(@Param('id') id: number): Promise<Comment | null> {
    return this.commentsService.findOne(id);
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
