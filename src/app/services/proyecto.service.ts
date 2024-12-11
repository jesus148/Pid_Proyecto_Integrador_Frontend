import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usurio.model';
import { AppSettings } from '../app.settings';
import { Proyecto } from '../models/proyecto';
import { Tarea } from '../models/tarea.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT_REGISTRER_PROYECT+"/proyecto";


const baseUrlPruebaGet = AppSettings.API_ENDPOINT_GET_PROYECT+"/proyecto";


const baseUrlPruebaTask = AppSettings.API_ENDPOINT_REGISTRER_TASK+"/tarea";



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

  



}
