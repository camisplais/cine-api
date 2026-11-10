import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryPeliculasDto {
  /** Filtra por ID de categoría */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoria?: number;

  /** Filtra por ID de director */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  director?: number;

  /** Busca por texto dentro del título */
  @IsOptional()
  @IsString()
  q?: string;
}
