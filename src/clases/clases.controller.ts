import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { Clase } from './entities/clase.entity';


@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) { }
  
  //CRUD

  //CREATE:
  @Post('crear')
  async crearClase(@Body() clase: Clase): Promise<boolean> {
    return await this.clasesService.create(clase);
  }
  //
  @Get('obtenerTodos')
  async buscarTodos(): Promise<Clase[]> {
    return await this.clasesService.findAll();
  }

  @Get('obtener/:id')
  async BusacarId(@Param('id') id: number): Promise<Clase> {
    return await this.clasesService.findOne(id);
  }


  //UPDATE:
  @Put('actualizar/:id')
  async actualizarClase(@Body() clase: Clase, @Param('id') id: number): Promise<String> {
    return await this.clasesService.update(id, clase);
  }

  //DELETE:
  @Delete('eliminar/:id')
  async eliminarClase(@Param('id') id: number): Promise<boolean> {
    return await this.clasesService.remove(id);
  }
}

