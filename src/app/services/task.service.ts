// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://Todo-list-project-env.eba-mavhznkn.us-east-2.elasticbeanstalk.com/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  // Eliminar tarea
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
