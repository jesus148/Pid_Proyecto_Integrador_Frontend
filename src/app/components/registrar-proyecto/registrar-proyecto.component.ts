import { Component, signal } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../security/token.service';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-registrar-proyecto',
  standalone: true,
  imports: [MenuComponent , AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule ,RouterLink ],
  templateUrl: './registrar-proyecto.component.html',
  styleUrl: './registrar-proyecto.component.css'
})
export class RegistrarProyectoComponent {


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    console.log("constructor >> constructor >>> " + this.tokenService.getToken());
   }

   hide = signal(true);
   clickEvent(event: MouseEvent) {
     this.hide.set(!this.hide());
     event.stopPropagation();
   }
}
