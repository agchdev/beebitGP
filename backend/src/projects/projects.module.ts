import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity/project.entity'; // Importar la entidad
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // Importa TypeORM con la entidad Project
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService, TypeOrmModule.forFeature([Project])], // Exporta también TypeORM
})
export class ProjectsModule {}
