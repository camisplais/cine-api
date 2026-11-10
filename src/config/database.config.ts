import { DataSourceOptions } from 'typeorm';
import { Pelicula } from '../peliculas/entities/pelicula.entity.js';
import { Director } from '../directores/entities/director.entity.js';
import { Categoria } from '../categorias/entities/categoria.entity.js';

export const getDatabaseConfig = (): DataSourceOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'cine',

  entities: [Pelicula, Director, Categoria],

  synchronize: false,
  migrationsRun: false,
});
