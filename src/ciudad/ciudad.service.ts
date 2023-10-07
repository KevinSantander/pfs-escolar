import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDto } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {

  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>
  ) { }

  async findAllRaw(): Promise<Ciudad[]> {
    this.ciudades = [];
    let datos = await this.ciudadRepository.query("select * from ciudad");

    datos.forEach(element => {
      let ciudad: Ciudad = new Ciudad(element["nombre"]);
      this.ciudades.push(ciudad)
    });
    return this.ciudades;
  }

  async findAllOrm(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find();
  }

  async findById(id: number): Promise<Ciudad> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (ciudad)
        return ciudad;
      else
        throw new Error('No se encuentra la ciudad!');
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Ciudad - ' + error
      }, HttpStatus.NOT_FOUND)
    }

  }

  async create(CiudadDto: CiudadDto): Promise<Ciudad> {
    try {
      let ciudad: Ciudad = await this.ciudadRepository.save(new Ciudad(CiudadDto.nombre));
      if (ciudad)
        return ciudad;
      else
        throw new Error('No se pudo crear la ciudad!');
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error de ciudad - ' + error
      }, HttpStatus.NOT_FOUND)
    }

  }

  async update(CiudadDto: CiudadDto, id: number): Promise<String> {

    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);


      if (!ciudad)
        throw new Error('no se pudo encontrar la ciudad a modificar');
      else {
        let datoViejo = ciudad.getNombre();
        ciudad.setNombre(CiudadDto.nombre);
        ciudad = await this.ciudadRepository.save(ciudad);
        return `ok ${datoViejo} --> ${CiudadDto.nombre}`;
      }

    }

    catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error de ciudad - ' + error
      }, HttpStatus.NOT_FOUND)
    }
    


  }

  async delete(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (!ciudad)
        throw new Error(' se elimino ciudad o no existe ');
      else {
        await this.ciudadRepository.remove(ciudad);
        return {
          id: id,
          message: `se elimino exitosamente`
        }
      }

    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en ciudad - ' + error
      }, HttpStatus.NOT_FOUND)
    }

  }

}