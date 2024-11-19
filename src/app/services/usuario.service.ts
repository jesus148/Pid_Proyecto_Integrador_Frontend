import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { UsuarioRegistrer } from '../models/UsuariosRegistrer';
import { Observable } from 'rxjs';

// const baseUrlUsuario = AppSettings.API_ENDPOINT+ '/api/usuario';
const baseUrlUsuario = AppSettings.API_ENDPOINT_REGISTRE_USER+ '/usuario';

@Injectable({providedIn: 'root'})
export class UsuarioRegistro {
  constructor(private http:HttpClient) { }

  RegistrarUser(body: UsuarioRegistrer): Observable<any>{
    return this.http.post(baseUrlUsuario+"/registrar",body);
  }

}
