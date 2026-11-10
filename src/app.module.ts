import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller.js';
import { CategoriasModule } from './categorias/categorias.module.js';
import { getDatabaseConfig } from './config/database.config.js';
import { DirectoresModule } from './directores/directores.module.js';
import { PeliculasModule } from './peliculas/peliculas.module.js';

@Module({
  imports: [
    // Carga las variables del archivo .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Configura la conexión con MySQL
    TypeOrmModule.forRootAsync({ useFactory: getDatabaseConfig }),

    CategoriasModule,
    DirectoresModule,
    PeliculasModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
