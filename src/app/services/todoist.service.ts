import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoistService {

  private apiUrl = 'http://Todo-list-project-env.eba-mavhznkn.us-east-2.elasticbeanstalk.com/api';  // Reemplázalo con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para eliminar un proyecto
  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}`);
  }

  // Método para listar proyectos
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  // Método para listar tareas
  getTasks(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  // Otros métodos como agregar tareas, editar, etc...
}
