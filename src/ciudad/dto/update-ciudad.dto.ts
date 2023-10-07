import { PartialType } from '@nestjs/mapped-types';
import { CiudadDto } from './ciudad.dto';

export class UpdateCiudadDto extends PartialType(CiudadDto) {}
