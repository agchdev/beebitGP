import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuracion de Swagger
  const config = new DocumentBuilder() // Construccion del objeto
    .setTitle('Beebit API Gestion de proyectos') // Titulo
    .setDescription('API para la gestion de proyectos') // Descripcion
    .setVersion('1.0') // Version
    .build(); // Configuraciones

  const document = SwaggerModule.createDocument(app, config); // Generar la documentacion
  SwaggerModule.setup('api/docs', app, document); // Ruta para acceder a la documentacion

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
