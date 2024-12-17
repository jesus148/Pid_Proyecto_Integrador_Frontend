// task.component.ts
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  tasks = []; // Lista de tareas que se mostrarán

  constructor(private taskService: TaskService) {}

  // Método para eliminar tarea
  onDelete(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => taskId !== taskId);
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
      }
    });
  }
}
