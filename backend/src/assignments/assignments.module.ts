import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity/assignment.entity';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment]),
    ProjectsModule,
    StaffModule
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService]
})
export class AssignmentsModule {}
