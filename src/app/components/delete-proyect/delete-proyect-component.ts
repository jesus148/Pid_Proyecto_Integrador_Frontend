import { Component, OnInit } from '@angular/core';
import { TodoistService } from '../../services/todoist.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects = [];

  constructor(private todoistService: TodoistService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // Método para cargar proyectos desde la API
  loadProjects(): void {
    this.todoistService.getProjects().subscribe((projects) => {
      //this.projects = projects;
    });
  }

  // Método para eliminar un proyecto
  deleteProject(projectId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.todoistService.deleteProject(projectId).subscribe(() => {
        this.loadProjects();  // Volver a cargar la lista después de la eliminación
      });
    }
  }
}
