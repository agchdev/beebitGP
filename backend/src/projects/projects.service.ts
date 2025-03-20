import { Injectable, NotFoundException } from '@nestjs/common'; // Esto sirve porque es un servicio que ayuda a inyectar el repositorio
import { InjectRepository } from '@nestjs/typeorm'; // Esto es para inyectar el repositorio
import { Repository } from 'typeorm'; // Esto es para inyectar el repositorio
import { Project } from './entities/project.entity/project.entity';
import { ProjectResponseDto } from './dto/project-response.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    // Método para obtener todos los proyectos
    async findAll(): Promise<ProjectResponseDto[]> {
        const projects = await this.projectRepository.find();

        // Mapear la lista de `Project` a `ProjectResponseDto[]`
        const projectsResponse: ProjectResponseDto[] = projects.map(project => ({
            id: project.id,
            name: project.name,
            description: project.description,
            image_url: project.imagen_url,
            start_date: project.start_date,
            end_date: project.end_date,
            status: project.status,
        }));

        return projectsResponse;
    }

    // Obtener un solo proyecto por ID
    async findOne(id: number): Promise<ProjectResponseDto | null> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) throw new NotFoundException(`La tarea con ID ${id} no existe.`);

        // Mapear la entidad `Project` a `ProjectResponseDto`
        const projectResponse: ProjectResponseDto = {
            id: project.id,
            name: project.name,
            description: project.description,
            image_url: project.imagen_url,
            start_date: project.start_date,
            end_date: project.end_date,
            status: project.status,
        };

        return projectResponse;
    }

    // Crear un nuevo proyecto
    async create(projectData: CreateProjectDto): Promise<ProjectResponseDto> {
        const newProject = this.projectRepository.create(projectData);

        // Mapear la entidad `Project` a `ProjectResponseDto`
        const projectResponse: ProjectResponseDto = {
            id: newProject.id,
            name: newProject.name,
            description: newProject.description,
            image_url: newProject.imagen_url,
            start_date: newProject.start_date,
            end_date: newProject.end_date,
            status: newProject.status,
        };

        await this.projectRepository.save(newProject);
        return projectResponse;
    }

    // Actualizar un proyecto por ID
    async update(id: number, projectData: UpdateProjectDto): Promise<ProjectResponseDto | null> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) return null;
        
        await this.projectRepository.update(id, projectData);
        return this.findOne(id);
    }

    // Eliminar un proyecto por ID
    async remove(id: number): Promise<ProjectResponseDto | null> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) return null;
        await this.projectRepository.remove(project);
        return project;
    }
}
