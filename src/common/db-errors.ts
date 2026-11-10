import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

/**
 * Si MySQL rechaza un borrado porque otras filas dependen del registro
 * (error 1451), responde 409 en vez de un 500 genérico.
 */
export function handleDeleteError(error: unknown, mensaje: string): never {
  if (
    error instanceof QueryFailedError &&
    (error.driverError as { errno?: number } | undefined)?.errno === 1451
  ) {
    throw new ConflictException(mensaje);
  }
  throw error;
}
