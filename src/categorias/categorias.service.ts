import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { handleDeleteError } from '../common/db-errors.js';
import { CreateCategoriaDto } from './dto/create-categoria.dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';
import { Categoria } from './entities/categoria.entity.js';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  create(dto: CreateCategoriaDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { categoria: 'ASC' } });
  }

  async findOne(id: number) {
    const categoria = await this.repo.findOneBy({ identificador: id });
    if (!categoria) throw new NotFoundException(`Categoría ${id} no existe`);
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    return this.repo.save(Object.assign(categoria, dto));
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    try {
      await this.repo.remove(categoria);
    } catch (error) {
      handleDeleteError(
        error,
        'No se puede eliminar la categoría porque tiene películas asociadas',
      );
    }
  }
}
