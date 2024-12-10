import { Component, OnInit } from '@angular/core';
import { TokenService } from '../security/token.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { RegistrarProyectoComponent } from '../components/registrar-proyecto/registrar-proyecto.component';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AppMaterialModule, FormsModule, CommonModule, MenuComponent,RegistrarProyectoComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  nombreUsuario = "";
  isOpen = true;

  isFormOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    // Verificar el estado de inicio de sesión y obtener el nombre del usuario
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserNameComplete() || 'Usuario'; // Obtener el nombre del usuario
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }
  onLogOut(): void {
    this.tokenService.logOut(); // Cerrar sesión
    window.location.reload(); // Recargar la página
  }

  
  openProjectForm(): void {
    this.isFormOpen = true; // Cambiar el estado para abrir el formulario
  }

}
