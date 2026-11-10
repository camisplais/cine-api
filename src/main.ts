import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Valida los DTOs: rechaza campos desconocidos y convierte tipos (ej. "5" -> 5)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Permite que la app móvil / web consuma la API
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
await bootstrap();
