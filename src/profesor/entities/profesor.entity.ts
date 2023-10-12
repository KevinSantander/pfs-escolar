import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'profesor'})
export class Profesor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  nombre: string;

  @Column()
  @IsNotEmpty()
  apellido: string;

  constructor(nombre: string,  apellido: string) {
    this.nombre = nombre;
    this.apellido = apellido;
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

  public getApellido():string {
    return this.apellido;
  }

  public setApellido(apellido: string) {
    return this.apellido = apellido;
  }
}
