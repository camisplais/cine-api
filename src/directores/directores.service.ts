import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { handleDeleteError } from '../common/db-errors.js';
import { CreateDirectorDto } from './dto/create-director.dto.js';
import { UpdateDirectorDto } from './dto/update-director.dto.js';
import { Director } from './entities/director.entity.js';

@Injectable()
export class DirectoresService {
  constructor(
    @InjectRepository(Director)
    private readonly repo: Repository<Director>,
  ) {}

  create(dto: CreateDirectorDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { director: 'ASC' } });
  }

  async findOne(id: number) {
    const director = await this.repo.findOneBy({ idDirector: id });
    if (!director) throw new NotFoundException(`Director ${id} no existe`);
    return director;
  }

  async update(id: number, dto: UpdateDirectorDto) {
    const director = await this.findOne(id);
    return this.repo.save(Object.assign(director, dto));
  }

  async remove(id: number) {
    const director = await this.findOne(id);
    try {
      await this.repo.remove(director);
    } catch (error) {
      handleDeleteError(
        error,
        'No se puede eliminar el director porque tiene películas asociadas',
      );
    }
  }
}
