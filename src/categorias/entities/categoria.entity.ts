import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Pelicula } from '../../peliculas/entities/pelicula.entity.js';

@Entity('categorias')
export class Categoria {

  @PrimaryGeneratedColumn({ name: 'Identificador' })
  identificador: number;

  @Column({
    name: 'Categoria',
    type: 'varchar',
    length: 100,
  })
  categoria: string;

  @OneToMany(() => Pelicula, (pelicula) => pelicula.categoria)
  peliculas: Pelicula[];
}
