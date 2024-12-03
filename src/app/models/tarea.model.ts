import { Proyecto } from "./proyecto";
import { Usuario } from "./usuario.model";

export class Tarea {
  idTarea?:number;
  nombre?:string;
  descripcion?:string;
  fechaVencimiento?:Date;
  prioridad?:number;
  idUsuario?:Usuario;
  fechaCreacion?:Date;
  idProyecto?:Proyecto;
}
