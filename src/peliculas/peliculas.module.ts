import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriasModule } from '../categorias/categorias.module.js';
import { DirectoresModule } from '../directores/directores.module.js';
import { Pelicula } from './entities/pelicula.entity.js';
import { PeliculasController } from './peliculas.controller.js';
import { PeliculasService } from './peliculas.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pelicula]),
    DirectoresModule,
    CategoriasModule,
  ],
  controllers: [PeliculasController],
  providers: [PeliculasService],
})
export class PeliculasModule {}
