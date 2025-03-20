import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity/comment.entity';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CreateCommentkDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Project } from 'src/projects/entities/project.entity/project.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,

        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,

        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
    ) { }

    // Obtener todos los comentarios
    async findAll(): Promise<CommentResponseDto[]> {
        const comments = await this.commentRepository.find({ relations: ['project', 'staff'] });

        return comments.map(comment => ({
            id: comment.id,
            project: comment.project,
            staff: comment.staff,
            content: comment.content,
            fecha_creacion: comment.fecha_creacion,
        }));
    }

    // Obtener un comentario por ID
    async findOne(id: number): Promise<CommentResponseDto | null> {
        const comment = await this.commentRepository.findOne({ where: { id }, relations: ['project', 'staff'] });

        if (!comment) {
            throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
        }

        return {
            id: comment.id,
            project: comment.project,
            staff: comment.staff,
            content: comment.content,
            fecha_creacion: comment.fecha_creacion,
        };
    }

    // Crear un nuevo comentario
    async create(createCommentDto: CreateCommentkDto): Promise<CommentResponseDto> {
        const project = await this.projectRepository.findOneBy({ id: createCommentDto.projectId });
        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${createCommentDto.projectId} no encontrado`);
        }

        const staff = await this.staffRepository.findOneBy({ id: createCommentDto.staffId });
        if (!staff) {
            throw new NotFoundException(`Miembro del staff con ID ${createCommentDto.staffId } no encontrado`);
        }

        const newComment = this.commentRepository.create(createCommentDto);
        const savedComment = await this.commentRepository.save(newComment);

        return {
            id: savedComment.id,
            project: savedComment.project,
            staff: savedComment.staff ,
            content: savedComment.content,
            fecha_creacion: savedComment.fecha_creacion,
        };
    }

    // Eliminar un comentario por ID
    async remove(id: number): Promise<CommentResponseDto | null> {
        const comment = await this.findOne(id);
        if (!comment) return null;
        await this.commentRepository.delete(id);
        return comment;
    }
}
