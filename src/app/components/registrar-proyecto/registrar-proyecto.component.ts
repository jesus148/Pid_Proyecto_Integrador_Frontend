import { Component, signal } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../security/token.service';
import { AuthService } from '../../security/auth.service';
import { Proyecto } from '../../models/proyecto';

@Component({
  selector: 'app-registrar-proyecto',
  standalone: true,
  imports: [MenuComponent , AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule ,RouterLink ],
  templateUrl: './registrar-proyecto.component.html',
  styleUrl: './registrar-proyecto.component.css'
})
export class RegistrarProyectoComponent {



  proyecto:Proyecto={
    nombre:'',
    descripcion:'',
    fechaCreacion:new Date(),
    idUsuario:{
      idUsuario: -1
    }
  }


  formRegistrar = this.formBuilder.group({
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]],
    validaDescripcion: ['', [Validators.required]],
});

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
