import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

import { CategoriasService } from '../categorias/categorias.service.js';
import { DirectoresService } from '../directores/directores.service.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { QueryPeliculasDto } from './dto/query-peliculas.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';
import { Pelicula } from './entities/pelicula.entity.js';

const RELATIONS = { director: true, categoria: true } as const;

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly repo: Repository<Pelicula>,
    private readonly directores: DirectoresService,
    private readonly categorias: CategoriasService,
  ) {}

  async create(dto: CreatePeliculaDto) {
    const { idDirector, idCategoria, ...datos } = dto;
    // findOne lanza 404 si el director o la categoría no existen
    const director = await this.directores.findOne(idDirector);
    const categoria = await this.categorias.findOne(idCategoria);

    const pelicula = await this.repo.save(
      this.repo.create({ ...datos, director, categoria }),
    );
    return this.findOne(pelicula.identificador);
  }

  findAll(query: QueryPeliculasDto = {}) {
    const where: FindOptionsWhere<Pelicula> = {};
    if (query.categoria) where.categoria = { identificador: query.categoria };
    if (query.director) where.director = { idDirector: query.director };
    if (query.q) where.titulo = Like(`%${query.q}%`);

    return this.repo.find({
      where,
      relations: RELATIONS,
      order: { titulo: 'ASC' },
    });
  }

  async findOne(id: number) {
    const pelicula = await this.repo.findOne({
      where: { identificador: id },
      relations: RELATIONS,
    });
    if (!pelicula) throw new NotFoundException(`Película ${id} no existe`);
    return pelicula;
  }

  async update(id: number, dto: UpdatePeliculaDto) {
    const pelicula = await this.findOne(id);
    const { idDirector, idCategoria, ...datos } = dto;

    Object.assign(pelicula, datos);
    if (idDirector !== undefined) {
      pelicula.director = await this.directores.findOne(idDirector);
    }
    if (idCategoria !== undefined) {
      pelicula.categoria = await this.categorias.findOne(idCategoria);
    }

    await this.repo.save(pelicula);
    return this.findOne(id);
  }

  async remove(id: number) {
    const pelicula = await this.findOne(id);
    await this.repo.remove(pelicula);
  }
}
