import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  type Relation,
} from 'typeorm';

import { Pelicula } from '../../peliculas/entities/pelicula.entity.js';

@Entity('directores')
export class Director {
  @PrimaryGeneratedColumn({ name: 'IDDirector' })
  idDirector: number;

  @Column({
    name: 'Director',
    type: 'varchar',
    length: 150,
  })
  director: string;

  @OneToMany(() => Pelicula, (pelicula) => pelicula.director)
  peliculas: Relation<Pelicula[]>;
}
