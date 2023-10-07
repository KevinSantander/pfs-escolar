import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDto } from './dto/ciudad.dto';

@Controller('ciudad')
export class CiudadController {

  constructor(private readonly ciudadService: CiudadService) { }

  @Get('raw')
  async getAllRaw(): Promise<Ciudad[]> {
    return this.ciudadService.findAllRaw();
  }

  @Get('orm')
  async getAllOrm(): Promise<Ciudad[]> {
    return this.ciudadService.findAllOrm();
  }

  @Get(':id')
  async getId(@Param('id') id: number): Promise<Ciudad> {
    return await this.ciudadService.findById(id);
  }

  @Post('crear')
  async crearCiudad(@Body() CiudadDto: CiudadDto): Promise<CiudadDto> {
    return this.ciudadService.create(CiudadDto);
  }

  @Put('actualizar')
  async actualizarCiudad(@Body() CiudadDto, @Param('id') id: number) {
    return this.ciudadService.uddate(CiudadDto);
  }

}