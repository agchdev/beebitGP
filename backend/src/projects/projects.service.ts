import { Injectable } from '@nestjs/common'; // Esto sirve porque es un servicio que ayuda a inyectar el repositorio
import { InjectRepository } from '@nestjs/typeorm'; // Esto es para inyectar el repositorio
import { Repository } from 'typeorm'; // Esto es para inyectar el repositorio
import { Project } from './entities/project.entity/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    // Método para obtener todos los proyectos
    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find();
    }

    // Obtener un solo proyecto por ID
    async findOne(id: number): Promise<Project | null> {
        return await this.projectRepository.findOne({ where: { id } });
    }

    // Crear un nuevo proyecto
    async create(projectData: Partial<Project>): Promise<Project> {
        const newProject = this.projectRepository.create(projectData);
        return await this.projectRepository.save(newProject);
    }

    // Actualizar un proyecto por ID
    async update(id: number, projectData: Partial<Project>): Promise<Project | null> {
        await this.projectRepository.update(id, projectData);
        return await this.findOne(id);
    }

    // Eliminar un proyecto por ID
    async remove(id: number): Promise<Project | null> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) return null;
        await this.projectRepository.remove(project);
        return project;
    }
}
