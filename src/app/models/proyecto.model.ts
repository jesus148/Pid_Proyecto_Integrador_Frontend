import { Proyecto } from "./proyecto";
import { UsuarioRegistrer } from "./UsuariosRegistrer";

export class ProyectoUser {
  idInvitado?:Number;
  descripcion?:string;
  proyecto?:Proyecto;
  usuario?:UsuarioRegistrer;
  fechaInvitacion?:Date
}
