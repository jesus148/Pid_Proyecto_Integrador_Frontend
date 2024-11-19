import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { UsuarioRegistrer } from '../../models/UsuariosRegistrer';
import { UtilService } from '../../services/util.service';
import { UsuarioRegistro } from '../../services/usuario.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrer',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule , MatFormFieldModule, MatInputModule, MatDatepickerModule ,     MatDatepickerModule,
    MatNativeDateModule , MatButtonModule, MatDividerModule, MatIconModule, RouterLink , CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './registrer.component.html',
  styleUrl: './registrer.component.css'
})
export class RegistrerComponent {


  usuario: UsuarioRegistrer={
    nombres:"",
    apellidos:"",
    dni:"",
    login:"",
    password:"",
    email:"",
    fechaNacimiento: new Date()
  }


  formRegistrar = this.formBuilder.group({
    validaNombres: ['', [Validators.required]],
    validaApellidos: ['', [Validators.required]],
    validaDni: ['', [Validators.required]],
    validaUserName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{6,30}')]],
    validacontrasena: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]],
    validaEmail: ['', [Validators.required , Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
    validaFechaInicio: ['', [Validators.required]],
});

hide = signal(true);
clickEvent(event: MouseEvent) {
  this.hide.set(!this.hide());
  event.stopPropagation();
}

  constructor(private utilservice:UtilService,
    private usuarioService:UsuarioRegistro,
    private formBuilder: FormBuilder
  ){
  }
  ngOnInit(): void{

  }

  Registra(){
    this.usuarioService.RegistrarUser(this.usuario).subscribe(
      x=>{
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        })
      },
    );
  }



}
