import { AppDataSource } from './data-source.js';
import { Categoria } from '../categorias/entities/categoria.entity.js';
import { Director } from '../directores/entities/director.entity.js';
import { Pelicula } from '../peliculas/entities/pelicula.entity.js';

const categorias = [
  'Acción',
  'Ciencia ficción',
  'Drama',
  'Animación',
  'Terror',
];

const directores = [
  'Christopher Nolan',
  'Denis Villeneuve',
  'Guillermo del Toro',
  'Greta Gerwig',
  'Hayao Miyazaki',
];

const peliculas = [
  {
    titulo: 'Interstellar',
    duracion: 169,
    director: 'Christopher Nolan',
    categoria: 'Ciencia ficción',
    sinopsis:
      'Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.',
  },
  {
    titulo: 'El caballero de la noche',
    duracion: 152,
    director: 'Christopher Nolan',
    categoria: 'Acción',
    sinopsis:
      'Batman se enfrenta al Joker, un criminal que sume a Gotham en el caos.',
  },
  {
    titulo: 'Dune',
    duracion: 155,
    director: 'Denis Villeneuve',
    categoria: 'Ciencia ficción',
    sinopsis:
      'Paul Atreides viaja al peligroso planeta Arrakis para proteger el futuro de su familia.',
  },
  {
    titulo: 'Blade Runner 2049',
    duracion: 164,
    director: 'Denis Villeneuve',
    categoria: 'Ciencia ficción',
    sinopsis:
      'Un joven blade runner descubre un secreto que podría sumir a la sociedad en el caos.',
  },
  {
    titulo: 'El laberinto del fauno',
    duracion: 119,
    director: 'Guillermo del Toro',
    categoria: 'Drama',
    sinopsis:
      'En la España de 1944, una niña descubre un mundo fantástico en un antiguo laberinto.',
  },
  {
    titulo: 'La forma del agua',
    duracion: 123,
    director: 'Guillermo del Toro',
    categoria: 'Drama',
    sinopsis:
      'Una conserje muda entabla una relación con una criatura anfibia capturada por el gobierno.',
  },
  {
    titulo: 'Barbie',
    duracion: 114,
    director: 'Greta Gerwig',
    categoria: 'Acción',
    sinopsis:
      'Barbie abandona Barbieland y descubre las alegrías y los peligros del mundo real.',
  },
  {
    titulo: 'El viaje de Chihiro',
    duracion: 125,
    director: 'Hayao Miyazaki',
    categoria: 'Animación',
    sinopsis:
      'Una niña queda atrapada en un mundo de espíritus y debe trabajar para liberar a sus padres.',
  },
  {
    titulo: 'Mi vecino Totoro',
    duracion: 86,
    director: 'Hayao Miyazaki',
    categoria: 'Animación',
    sinopsis:
      'Dos hermanas se mudan al campo y conocen a los amistosos espíritus del bosque.',
  },
];

await AppDataSource.initialize();

try {
  const repoCat = AppDataSource.getRepository(Categoria);
  const repoDir = AppDataSource.getRepository(Director);
  const repoPel = AppDataSource.getRepository(Pelicula);

  if ((await repoPel.count()) > 0) {
    console.log('La base de datos ya tiene películas; no se hace nada.');
  } else {
    const cats = await repoCat.save(
      categorias.map((categoria) => ({ categoria })),
    );
    const dirs = await repoDir.save(
      directores.map((director) => ({ director })),
    );

    await repoPel.save(
      peliculas.map(({ director, categoria, ...datos }) => ({
        ...datos,
        director: dirs.find((d) => d.director === director)!,
        categoria: cats.find((c) => c.categoria === categoria)!,
      })),
    );
    console.log(`Seed listo: ${peliculas.length} películas insertadas.`);
  }
} finally {
  await AppDataSource.destroy();
}
