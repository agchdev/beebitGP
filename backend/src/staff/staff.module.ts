import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])], // Asegura que se importe correctamente
  providers: [StaffService],
  controllers: [StaffController],
  exports: [StaffService, TypeOrmModule.forFeature([Staff])] // Exportar para que otros módulos puedan usarlo
})
export class StaffModule {}
