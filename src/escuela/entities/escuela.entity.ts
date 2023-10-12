import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'escuela'})
export class Escuela {

  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  nombre: string;

  @Column()
  domicilio: string;

  constructor(nombre: string, domicilio: string) {
    this.nombre = nombre;
    this.domicilio = domicilio;
  }

  public getId(): number {
    return this.id;
  }

  public getNombre() {
    return this.nombre;
  }

  public setNombre(nombre: string) {
    return this.nombre = nombre;
  }

  public getDomicilio():string {
    return this.domicilio;
  }

  public setDomicilio(domicilio: string) {
    return this.domicilio = domicilio;
  }

}
