import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAssignment } from './entities/task_assignment.entity/task_assignment.entity';
import { TaskAssignmentsController } from './task_assignments.controller';
import { TaskAssignmentsService } from './task_assignments.service';
import { Task } from 'src/tasks/entities/task.entity/task.entity';
import { Staff } from 'src/staff/entities/staff.entity/staff.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskAssignment, Task, Staff]),
    TasksModule,
    StaffModule
  ],
  controllers: [TaskAssignmentsController],
  providers: [TaskAssignmentsService],
  exports: [TaskAssignmentsService]
})
export class TaskAssignmentsModule {}
