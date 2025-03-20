import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from './staff.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Staff } from './entities/staff.entity/staff.entity';

describe('StaffService', () => { //Define el grupo de pruebas para el servicio de Staff.
  let service: StaffService; //Define la variable que contiene el servicio
  let repository: Repository<Staff>; //Define la variable que contiene el repositorio

  beforeEach(async () => { //Define la función que se ejecuta antes de cada prueba
    const module: TestingModule = await Test.createTestingModule({ //Crea el módulo de pruebas
      providers: [ // Define los proveedores que en este caso son el servicio y el repositorio
        StaffService,
        {
          /** Define el proveedor del repositorio
           * getRepositoryToken() es una función que devuelve el token del repositorio
           * useClass() es una función que devuelve la clase del repositorio
           */
          provide: getRepositoryToken(Staff),
          useClass: Repository,
        },
      ],
    }).compile(); //Compila el módulo

    service = module.get<StaffService>(StaffService); //Obtiene el servicio
    repository = module.get<Repository<Staff>>(getRepositoryToken(Staff)); //Obtiene el repositorio
    
  });

  it('debería estar definido', () => { //Define la prueba
    expect(service).toBeDefined(); //Comprueba que el servicio está definido
  });

      /**
     * ¿Qué hace esta prueba? findAll()
     * 1. Crea una lista de ejemplo con dos miembros del staff.
     * 2. Mockea (jest.spyOn) el método find() del repositorio para que devuelva esa lista en lugar de hacer una consulta real.
     * 3. Llama a service.findAll().
     * 4. Comprueba que la salida sea exactamente igual a la lista esperada.
     */

      it('debería obtener todos los miembros del staff', async () => {
        const staffList: Staff[] = [
          { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'Desarrollador' },
          { id: 2, name: 'María López', email: 'maria@example.com', rol: 'Diseñadora' },
        ];
      
        jest.spyOn(repository, 'find').mockResolvedValue(staffList);
      
        expect(await service.findAll()).toEqual(staffList);
      });
  
      /**
       * ¿Qué hace esta prueba? findOne(id)
       * 1. Crea un miembro de staff de ejemplo.
       * 2. Mockea findOne() para que devuelva ese objeto cuando se llame con ID 1.
       * 3. Llama a service.findOne(1).
       * 4. Verifica que devuelve el mismo objeto esperado.
       */
  
      it('debería obtener un miembro del staff por ID', async () => {
        const staffMember: Staff = { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'Desarrollador' };
      
        jest.spyOn(repository, 'findOne').mockResolvedValue(staffMember);
      
        expect(await service.findOne(1)).toEqual(staffMember);
      });
  
      /**
       * ¿Qué hace esta prueba? create()
       * 1. Define un nuevo miembro de staff de prueba.
       * 2. Mockea create() para simular que el repositorio crea el objeto.
       * 3. Mockea save() para simular que guarda el objeto y lo devuelve.
       * 4. Llama a service.create() y verifica que devuelve el objeto esperado.
       */
  
      it('debería crear un nuevo miembro del staff', async () => {
        const newStaffMember: Staff = { id: 3, name: 'Carlos Gómez', email: 'carlos@example.com', rol: 'Tester' };
      
        jest.spyOn(repository, 'create').mockReturnValue(newStaffMember);
        jest.spyOn(repository, 'save').mockResolvedValue(newStaffMember);
      
        expect(await service.create(newStaffMember)).toEqual(newStaffMember);
      });
  
      /**
       * ¿Qué hace esta prueba? update()
       * 1. Define un miembro de staff actualizado.
       * 2. Mockea update() para que no haga nada.
       * 3. Mockea findOne() para devolver el objeto actualizado.
       * 4. Llama a service.update(1, { role: 'Gerente' }) y verifica que devuelve el objeto actualizado.
       */
  
      it('debería actualizar un miembro del staff', async () => {
        const updatedStaffMember: Staff = { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'Gerente' };
      
        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as UpdateResult);
        jest.spyOn(repository, 'findOne').mockResolvedValue(updatedStaffMember);
      
        expect(await service.update(1, { rol: 'Gerente' })).toEqual(updatedStaffMember);
      });
  
      /**
       * ¿Qué hace esta prueba? remove() 
       * 1. Simula que el miembro de staff existe (findOne()).
       * 2. Mockea delete() para que elimine el objeto sin errores.
       * 3. Llama a service.remove(1) y verifica que devuelve el objeto eliminado.
       */
  
      it('debería eliminar un miembro del staff', async () => {
        const staffMember: Staff = { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'Desarrollador' };
      
        jest.spyOn(repository, 'findOne').mockResolvedValue(staffMember);
        jest.spyOn(repository, 'remove').mockResolvedValue(staffMember as any);
      
        expect(await service.remove(1)).toEqual({ message: 'Miembro del staff eliminado correctamente' });
      });
      
});
