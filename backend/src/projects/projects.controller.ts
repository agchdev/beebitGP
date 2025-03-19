import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    // Obtener todos los proyectos
    @Get()
    async getAllProjects(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    // Obtener un proyecto por ID
    @Get(':id')
    async getProject(@Param('id') id: number): Promise<Project | null> {
        return this.projectsService.findOne(id);
    }

    // Crear un nuevo proyecto
    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectsService.create(createProjectDto);
    }

    // Actualizar proyecto
    @Put(':id')
    async updateProject(
        @Param('id') id: number,
        @Body() updateProjectDto: UpdateProjectDto
    ): Promise<Project | null> {
        return this.projectsService.update(id, updateProjectDto);
    }

    // Eliminar proyecto
    @Delete(':id')
    async deleteProject(@Param('id') id: number): Promise<void> {
        return this.projectsService.remove(id);
    }
}
