import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { StaffModule } from './staff/staff.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskAssignmentsModule } from './task_assignments/task_assignments.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Esto es para inyectar el ConfigService, el ConfigService es el encargado de leer las variables de entorno
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT')!,
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),      
    }),
    ProjectsModule,
    StaffModule,
    AssignmentsModule,
    TasksModule,
    TaskAssignmentsModule,
    CommentsModule,
    FilesModule,
    InvitationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
