# Cine API

Backend (NestJS + TypeORM + MySQL) para la app móvil de la sala de cine.
Tablas: **Películas**, **Directores** y **Categorías**.

## Puesta en marcha

```bash
npm install
cp .env.example .env        # ajusta usuario/contraseña de MySQL
# crea la base de datos vacía:  CREATE DATABASE cine;
npm run migration:run       # crea las tablas
npm run seed                # (opcional) carga 9 películas de ejemplo
npm run start:dev           # http://localhost:3000
```

## Endpoints

Todos devuelven JSON. Los borrados responden `204`.

| Recurso      | Rutas                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| Películas    | `GET /peliculas` · `GET /peliculas/:id` · `POST` · `PATCH /:id` · `DELETE /:id` |
| Directores   | `GET /directores` · `GET /directores/:id` · `POST` · `PATCH /:id` · `DELETE /:id` |
| Categorías   | `GET /categorias` · `GET /categorias/:id` · `POST` · `PATCH /:id` · `DELETE /:id` |

`GET /peliculas` acepta filtros opcionales: `?categoria=ID`, `?director=ID`, `?q=texto` (busca en el título).
Cada película incluye su `director` y su `categoria`.

### Ejemplo: crear película

```http
POST /peliculas
{ "titulo": "Coco", "duracion": 105, "sinopsis": "…", "idDirector": 1, "idCategoria": 4 }
```

- `duracion` va en minutos.
- Si el director o la categoría no existen → `404`.
- Si el cuerpo es inválido o trae campos de más → `400`.
- Si intentas borrar un director o categoría con películas asociadas → `409`.

## Scripts útiles

| Comando                      | Qué hace                         |
| ---------------------------- | -------------------------------- |
| `npm run start:dev`          | Servidor en modo watch           |
| `npm run build` / `start:prod` | Compila y corre desde `dist`   |
| `npm run migration:run`      | Aplica migraciones               |
| `npm run migration:revert`   | Revierte la última migración     |
| `npm run migration:show`     | Lista el estado de migraciones   |
| `npm run seed`               | Inserta datos de ejemplo         |
| `npm test` / `npm run test:e2e` | Tests unitarios / e2e         |

## Conectar la app móvil

El servidor escucha en `0.0.0.0` y tiene CORS habilitado. Desde un celular o emulador usa la IP de tu
computadora (por ejemplo `http://192.168.1.10:3000`), no `localhost`.
