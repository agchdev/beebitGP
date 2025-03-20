import { Test, TestingModule } from '@nestjs/testing'; // Herramientas para crear el módulo de pruebas
import { StaffController } from './staff.controller'; // El controlador que vamos a probar
import { StaffService } from './staff.service'; // El servicio que usa el controlador
import { CreateStaffDto } from './dto/ create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto'; // DTO para actualizar Staff
import { Staff } from './entities/staff.entity/staff.entity'; // La entidad Staff

describe('StaffController', () => {
  let controller: StaffController; // Variable para el controlador
  let service: StaffService; // Variable para el servicio

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController], // Registramos el controlador
      providers: [
        {
          provide: StaffService, // Simulamos el servicio
          useValue: {
            findAll: jest.fn(), // Creamos mocks de los métodos
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile(); // Compilamos el módulo

    controller = module.get<StaffController>(StaffController); // Obtenemos el controlador
    service = module.get<StaffService>(StaffService); // Obtenemos el servicio
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined(); // Verifica que el controlador se haya instanciado correctamente
  });

  it('debería obtener todos los miembros del staff', async () => {
    const staffList: Staff[] = [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'Desarrollador' },
      { id: 2, name: 'María López', email: 'maria@example.com', rol: 'Diseñadora' },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(staffList);

    expect(await controller.getAllStaff()).toEqual({ status: 200, data: staffList });
  });

  it('debería obtener un miembro del staff por ID', async () => {
    const staffMember: Staff = { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'Desarrollador' };

    jest.spyOn(service, 'findOne').mockResolvedValue(staffMember);

    expect(await controller.getStaff(1)).toEqual({ status: 200, data: staffMember });
  });

  it('debería crear un nuevo miembro del staff', async () => {
    const createDto: CreateStaffDto = { name: 'Carlos Gómez', email: 'carlos@example.com', rol: 'Tester' };
    const createdStaff: Staff = { id: 3, ...createDto };

    jest.spyOn(service, 'create').mockResolvedValue(createdStaff);

    expect(await controller.createStaff(createDto)).toEqual({ status: 201, data: createdStaff });
  });

  it('debería actualizar un miembro del staff', async () => {
    const updateDto: UpdateStaffDto = { rol: 'Gerente' };
    const updatedStaff: Staff = { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'Gerente' };

    jest.spyOn(service, 'update').mockResolvedValue(updatedStaff);

    expect(await controller.updateStaff(1, updateDto)).toEqual({ status: 200, data: updatedStaff });
  });

  it('debería eliminar un miembro del staff', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue({ message: 'Miembro del staff eliminado correctamente' });
  
    await expect(controller.deleteStaff(1))
      .resolves.toEqual({ status: 200, message: 'Miembro del staff eliminado correctamente' });
  });
});
