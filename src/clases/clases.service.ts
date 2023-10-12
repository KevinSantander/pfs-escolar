import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class ClasesService {

  constructor(@InjectRepository(Clase)
  private claseReposotory:Repository<Clase>
  ) {}

  //La Clase nos llega como parametro en "claseDto", generamos una nueva clase "new Clase()" la guardamos y con el metodo ".save()" nos va retornar una nueva clase que se guardo.
  async create(claseDto: Clase): Promise<boolean> {
    let clase : Clase = await this.claseReposotory.save(new Clase(claseDto.nombre))
    if(clase)
      return true
    return false;
  }

  async findAll(): Promise<Clase[]> {
    return await this.claseReposotory.find();
  }

  async findOne(id: number) {
    const criterio : FindOneOptions = {where:{id:id}}
    let clase : Clase = await this.claseReposotory.findOne(criterio);
    if(clase)
      return clase;
    else
      return null;
  }

  async update(id: number, claseDto: Clase): Promise<String> {
    const criterio : FindOneOptions = {where:{id:id}};
    let clase : Clase = await this.claseReposotory.findOne(criterio);
    let nombreViejo = clase.getNombre();
      if(clase) {
        clase.setNombre(claseDto.getNombre());
        clase = await this.claseReposotory.save(clase);
      if(clase)
        return `${nombreViejo} Se cambio el nombre a:  ${clase.getNombre()}`;
      else
        return `no se pudo remplazar`;
    }
    else
      return`No se pudo encontrar clase`;
  }

  async remove(id: number): Promise<boolean> {
    try {
      const criterio : FindOneOptions = {where:{id:id}};
      let clase : Clase = await this.claseReposotory.findOne(criterio);
      if(clase) {
        await this.claseReposotory.remove(clase);
        return true;
      }else
        throw new Error('No se encontro clase para eliminar');
    } catch(error) {
      throw new HttpException({
        satats: HttpStatus.NOT_FOUND,
        error: 'Problemas en clase - ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

}
