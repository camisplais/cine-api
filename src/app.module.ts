import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getDatabaseConfig } from './config/database.config.js';

import { Pelicula } from './peliculas/entities/pelicula.entity.js';
import { Director } from './directores/entities/director.entity.js';
import { Categoria } from './categorias/entities/categoria.entity.js';

@Module({
  imports: [
    // Carga las variables del archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configura la conexión con MySQL
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),

    // Registra las entidades para poder utilizar sus repositorios
    TypeOrmModule.forFeature([
      Pelicula,
      Director,
      Categoria,
    ]),
  ],
})
export class AppModule {}