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
import { Project } from './entities/project.entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    // Obtener todos los proyectos
    @ApiOperation({ summary: 'Obtener todos los proyectos' })
    @ApiResponse({ status: 200, description: 'Lista de proyectos', type: [Project] })
    @ApiResponse({ status: 404, description: 'No se encontraron proyectos' })
    @Get()
    async getAllProjects() {
        const projects = await this.projectsService.findAll();
        if (!projects.length) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'No se encontraron proyectos' }, HttpStatus.NOT_FOUND);
        }
        return { status: HttpStatus.OK, data: projects };
    }

    // Obtener un proyecto por ID
    @ApiOperation({ summary: 'Obtener un proyecto por ID' })
    @ApiResponse({ status: 200, description: 'Proyecto encontrado', type: Project })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    @Get(':id')
    async getProject(@Param('id') id: number) {
        const project = await this.projectsService.findOne(id);
        if (!project) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Proyecto no encontrado' }, HttpStatus.NOT_FOUND);
        }
        return { status: HttpStatus.OK, data: project };
    }

    // Crear un nuevo proyecto
    @ApiOperation({ summary: 'Crear un nuevo proyecto' })
    @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente', type: Project })
    @ApiResponse({ status: 400, description: 'Error al crear el proyecto' })
    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto) {
        try {
            const project = await this.projectsService.create(createProjectDto);
            return { status: HttpStatus.CREATED, data: project };
        } catch (error) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: 'Error al crear el proyecto' }, HttpStatus.BAD_REQUEST);
        }
    }

    // Actualizar proyecto
    @ApiOperation({ summary: 'Actualizar un proyecto' })
    @ApiResponse({ status: 200, description: 'Proyecto actualizado correctamente', type: Project })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    @Put(':id')
    async updateProject(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        const updatedProject = await this.projectsService.update(id, updateProjectDto);
        if (!updatedProject) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Proyecto no encontrado' }, HttpStatus.NOT_FOUND);
        }
        return { status: HttpStatus.OK, data: updatedProject };
    }

    // Eliminar proyecto
    @ApiOperation({ summary: 'Eliminar un proyecto' })
    @ApiResponse({ status: 204, description: 'Proyecto eliminado correctamente' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
    @Delete(':id')
    async deleteProject(@Param('id') id: number) {
        const deleted = await this.projectsService.remove(id);
        if (!deleted) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, message: 'Proyecto no encontrado' }, HttpStatus.NOT_FOUND);
        }
        return { status: HttpStatus.NO_CONTENT, message: 'Proyecto eliminado correctamente' };
    }
}
