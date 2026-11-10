import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  /** Duración en minutos */
  @IsInt()
  @IsPositive()
  duracion: number;

  @IsString()
  @IsNotEmpty()
  sinopsis: string;

  @IsInt()
  @IsPositive()
  idDirector: number;

  @IsInt()
  @IsPositive()
  idCategoria: number;
}
