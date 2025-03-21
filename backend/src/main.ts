import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('🔥 Iniciando NestJS...');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log('Servidor NestJS levantado');

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Beebit API')
    .setDescription('API para la gestión de proyectos')
    .setVersion('1.0')
    .build();

  console.log('Creando documentación Swagger...');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  console.log('Swagger registrado en /api/docs');

  await app.listen(3000);
  console.log('Servidor ejecutándose en http://localhost:3000');
}
bootstrap();
