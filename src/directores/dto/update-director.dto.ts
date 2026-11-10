import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectorDto } from './create-director.dto.js';

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {}
