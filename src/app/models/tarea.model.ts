import { Proyecto } from "./proyecto";
import { Usuario } from "./usuario.model";
import { UsuarioRegistrer } from "./UsuariosRegistrer";

export class Tarea {
  idTarea?:number;
  nombre?:string;
  descripcion?:string;
  fechaVencimiento?:Date;
  prioridad?:number;
  estadoTarea?:string;
  fechaCreacion?:Date;
  proyecto?:Proyecto;
  usuario?:UsuarioRegistrer | null;
}
