import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';

import { Director } from '../../directores/entities/director.entity.js';
import { Categoria } from '../../categorias/entities/categoria.entity.js';

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn({ name: 'Identificador' })
  identificador: number;

  @Column({
    name: 'Titulo',
    type: 'varchar',
    length: 150,
  })
  titulo: string;

  @Column({
    name: 'Duracion',
    type: 'int',
  })
  duracion: number;

  @Column({
    name: 'Sinopsis',
    type: 'text',
  })
  sinopsis: string;

  @ManyToOne(() => Director, (director) => director.peliculas, {
    nullable: false,
  })
  @JoinColumn({ name: 'IDDirector', referencedColumnName: 'idDirector' })
  director: Relation<Director>;

  @ManyToOne(() => Categoria, (categoria) => categoria.peliculas, {
    nullable: false,
  })
  @JoinColumn({
    name: 'IDCategoria',
    referencedColumnName: 'identificador',
  })
  categoria: Relation<Categoria>;
}
