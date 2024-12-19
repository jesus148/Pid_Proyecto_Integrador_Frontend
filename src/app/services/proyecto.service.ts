import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usurio.model';
import { AppSettings } from '../app.settings';
import { Proyecto } from '../models/proyecto';
import { Tarea } from '../models/tarea.model';
import { Comentario } from '../models/comentario.model';
import { UsuarioRegistrer } from '../models/UsuariosRegistrer';
import { ProyectoUser } from '../models/proyecto.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT_REGISTRER_PROYECT+"/proyecto";


const baseUrlPruebaGet = AppSettings.API_ENDPOINT_GET_PROYECT+"/proyecto";


const baseUrlPruebaTask = AppSettings.API_ENDPOINT_REGISTRER_TASK+"/tarea";


const baseUrlPruebaTaskGet = AppSettings.API_ENDPOINT_GET_TASK+"/tarea";

const baseUrlPruebaDeletetask = AppSettings.API_ENDPOINT_DELETE_TASK+"/tarea";


const baseUrlPruebaUpdatetask = AppSettings.API_ENDPOINT_UPDATE_TASK+"/tarea";

const baseUrlPruebaRegistrarTaskCommentary = AppSettings.API_ENDPOINT_COMENTARY_TASK+"/comentario";


const baseUrlPruebaUsuarioGet= AppSettings.API_ENDPOINT_USUARIOS_GET+"/usuario";


const baseUrlPruebaUser= AppSettings.API_ENDPOINT_USUARIOS_GET_ONE+"/usuario";


const baseUrlPruebaURegistrerInvitacion= AppSettings.API_ENDPOINT_USUARIOS_INVITAR+"/invitado";


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http:HttpClient) { }


  registrarProyecto(data:Proyecto):Observable<any>{
    return this.http.post(baseUrlPrueba+"/registrar",data);
  }


  GetProyect():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(baseUrlPruebaGet+"/listado");
  }


  registrarTarea(data:Tarea):Observable<any>{
    return this.http.post(baseUrlPruebaTask+"/registrar",data);
  }


  GetTask():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(baseUrlPruebaGet+"/listado");
  }


  GetTaskAll():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(baseUrlPruebaTaskGet+"/listado");
  }




  DeleteTask(idTarea:number):Observable<void>{
    return this.http.delete<void>(baseUrlPruebaDeletetask+"/eliminar/"+idTarea);
  }


  UpdateTask(data:Tarea):Observable<any>{
    return this.http.put(baseUrlPruebaUpdatetask+"/actualizar",data);
  }


  registrarComentary(data:Comentario):Observable<any>{
    return this.http.post(baseUrlPruebaRegistrarTaskCommentary+"/registrar", data)
  }




  GetUserkAll():Observable<UsuarioRegistrer[]>{
    return this.http.get<UsuarioRegistrer[]>(baseUrlPruebaUsuarioGet+"/listado");
  }


  consultarUserDni(filtro:Number):Observable<any>{
    return this.http.get(baseUrlPruebaUser+"/buscar/"+ filtro);
  }


  registrarUserInvitacion(data:ProyectoUser):Observable<any>{
    return this.http.post(baseUrlPruebaURegistrerInvitacion+"/registrar", data)
  }


}
