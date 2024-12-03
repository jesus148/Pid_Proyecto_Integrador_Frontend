import { Usuario } from "./usurio.model";

export class Proyecto {
  idProyecto?:number;
  nombre?:string;
  descripcion?:string;
  fechaCreacion?:Date;
  idUsuario?:Usuario
}
