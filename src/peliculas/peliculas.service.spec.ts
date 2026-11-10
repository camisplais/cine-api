import { NotFoundException } from '@nestjs/common';
import { PeliculasService } from './peliculas.service.js';

describe('PeliculasService', () => {
  const director = { idDirector: 1, director: 'Nolan' };
  const categoria = { identificador: 2, categoria: 'Ciencia ficción' };
  const guardada = { identificador: 10 };

  const repo = {
    create: vi.fn((x) => x),
    save: vi.fn(async () => guardada),
    findOne: vi.fn(),
    find: vi.fn(),
    remove: vi.fn(),
  };
  const directores = { findOne: vi.fn(async () => director) };
  const categorias = { findOne: vi.fn(async () => categoria) };

  let service: PeliculasService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new PeliculasService(
      repo as never,
      directores as never,
      categorias as never,
    );
  });

  it('create valida director y categoría y devuelve la película con relaciones', async () => {
    repo.findOne.mockResolvedValue({ ...guardada, director, categoria });

    const result = await service.create({
      titulo: 'Interstellar',
      duracion: 169,
      sinopsis: 'Viaje espacial',
      idDirector: 1,
      idCategoria: 2,
    });

    expect(directores.findOne).toHaveBeenCalledWith(1);
    expect(categorias.findOne).toHaveBeenCalledWith(2);
    expect(result.director).toBe(director);
  });

  it('findOne lanza 404 si no existe', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findAll aplica los filtros recibidos', async () => {
    repo.find.mockResolvedValue([]);
    await service.findAll({ categoria: 2, director: 1, q: 'inter' });

    const arg = repo.find.mock.calls[0]![0] as {
      where: Record<string, unknown>;
    };
    expect(arg.where.categoria).toEqual({ identificador: 2 });
    expect(arg.where.director).toEqual({ idDirector: 1 });
    expect(arg.where.titulo).toBeDefined();
  });
});
