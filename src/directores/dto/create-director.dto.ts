import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDirectorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  director: string;
}
