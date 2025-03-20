import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    // Obtener todos los proyectos
    @Get()
    @ApiOperation({ summary: 'Obtener todos los proyectos' })
    @ApiResponse({ status: 200, description: 'Lista de proyectos', type: [ProjectResponseDto] })
    async getAllProjects(): Promise<{ status: number; data: ProjectResponseDto[] }> {
        const projects = await this.projectsService.findAll();

        // Mapear la lista de `Project` a `ProjectResponseDto[]`
        const projectsResponse: ProjectResponseDto[] = projects.map(project => ({
            id: project.id,
            name: project.name,
            description: project.description,
            image_url: project.image_url,
            start_date: project.start_date,
            end_date: project.end_date,
            status: project.status,
        }));

        return { status: HttpStatus.OK, data: projectsResponse };
    }

    // Obtener un proyecto por ID
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un proyecto por ID' })
    @ApiResponse({ status: 200, description: 'Proyecto encontrado', type: ProjectResponseDto })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async getProject(@Param('id') id: number): Promise<{ status: number; data: ProjectResponseDto }> {
        const project = await this.projectsService.findOne(id);
        if (!project) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Proyecto no encontrado' }, HttpStatus.NOT_FOUND);
        }

        // Mapear la entidad `Project` a `ProjectResponseDto`
        const projectResponse: ProjectResponseDto = {
            id: project.id,
            name: project.name,
            description: project.description,
            image_url: project.image_url,
            start_date: project.start_date,
            end_date: project.end_date,
            status: project.status,
        };

        return { status: HttpStatus.OK, data: projectResponse };
    }

    // Crear un nuevo proyecto
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo proyecto' })
    @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente', type: ProjectResponseDto })
    @ApiResponse({ status: 400, description: 'Error al crear el proyecto' })
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<{ status: HttpStatus; data: ProjectResponseDto }> {
        try {
            const project = await this.projectsService.create(createProjectDto);

            // Mapear la entidad `Project` a `ProjectResponseDto`
            const projectResponse: ProjectResponseDto = {
                id: project.id,
                name: project.name,
                description: project.description,
                image_url: project.image_url,
                start_date: project.start_date,
                end_date: project.end_date,
                status: project.status,
            };

            return { status: HttpStatus.CREATED, data: projectResponse };
        } catch (error) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear el proyecto' }, HttpStatus.BAD_REQUEST);
        }
    }

    // Actualizar proyecto
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un proyecto' })
    @ApiResponse({ status: 200, description: 'Proyecto actualizado correctamente', type: ProjectResponseDto })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    @ApiResponse({ status: 400, description: 'Error en la validación de los datos' })
    async updateProject(
        @Param('id') id: number,
        @Body() updateProjectDto: UpdateProjectDto
    ): Promise<{ status: number; data: ProjectResponseDto }> {
        const updatedProject = await this.projectsService.update(id, updateProjectDto);

        if (!updatedProject) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Proyecto no encontrado' }, HttpStatus.NOT_FOUND);
        }

        // Mapear a ProjectResponseDto
        const projectResponse: ProjectResponseDto = {
            id: updatedProject.id,
            name: updatedProject.name,
            description: updatedProject.description,
            image_url: updatedProject.image_url,
            start_date: updatedProject.start_date,
            end_date: updatedProject.end_date,
            status: updatedProject.status,
        };

        return { status: HttpStatus.OK, data: projectResponse };
    }

    // Eliminar proyecto
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un proyecto' })
    @ApiResponse({ status: 200, description: 'Proyecto eliminado correctamente' }) // 👈 Mejor usar 200 en vez de 204 para incluir un mensaje
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    async deleteProject(@Param('id') id: number): Promise<{ status: number; message: string }> {
        const deleted = await this.projectsService.remove(id);

        if (!deleted) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Proyecto no encontrado' }, HttpStatus.NOT_FOUND);
        }

        return { status: HttpStatus.OK, message: 'Proyecto eliminado correctamente' }; // 👈 Devolver 200 con mensaje
    }
}
