import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'clases' })
export class Clase {
  //atributos
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;


  //contructor
  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }

}
