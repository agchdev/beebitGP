import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Project } from 'src/projects/entities/project.entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService, TypeOrmModule], // Exporta para que otros módulos puedan usarlo
})
export class TasksModule {}
