import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity/project.entity'; // Importar la entidad
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // Importar TypeORM y la entidad
  providers: [ProjectsService],
  controllers: [ProjectsController],
  //exports: [ProjectsService], // Exportar si otros módulos lo necesitan
})
export class ProjectsModule {}
