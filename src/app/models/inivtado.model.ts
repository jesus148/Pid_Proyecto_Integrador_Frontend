import { Proyecto } from "./proyecto";
import { UsuarioRegistrer } from "./UsuariosRegistrer";

export class InvitadoProyecto {
  idInvitado?:Number;
  descripcion?:string;
  idProyecto?:Proyecto;
  idUsuario?:UsuarioRegistrer;
  fechaInvitacion?:Date
}
