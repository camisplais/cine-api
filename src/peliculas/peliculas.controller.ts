import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { QueryPeliculasDto } from './dto/query-peliculas.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';
import { PeliculasService } from './peliculas.service.js';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly service: PeliculasService) {}

  @Post()
  create(@Body() dto: CreatePeliculaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryPeliculasDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePeliculaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
