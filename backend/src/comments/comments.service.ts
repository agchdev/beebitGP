import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity/comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.project', 'project')
            .leftJoinAndSelect('comment.staff', 'staff')
            .getMany();
    }

    async findOne(id: number): Promise<Comment | null> {
        return await this.commentRepository.findOne({ where: { id }, relations: ['project', 'staff'] });
    }

    async create(commentData: Partial<Comment>): Promise<Comment> {
        const newComment = this.commentRepository.create(commentData);
        return await this.commentRepository.save(newComment);
    }

    async update(id: number, commentData: Partial<Comment>): Promise<Comment | null> {
        await this.commentRepository.update(id, commentData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.commentRepository.delete(id);
    }
}
