import { Component, Inject } from '@angular/core';
import { ProyectoUser } from '../../models/proyecto.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { UsuarioRegistrer } from '../../models/UsuariosRegistrer';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto';
import { MenuComponent } from '../../menu/menu.component';
import { AppMaterialModule } from '../../app.material.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invite-usuario',
  standalone: true,
  imports: [MatFormFieldModule,
    AppMaterialModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      ReactiveFormsModule,
      CommonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MenuComponent,
      MatDialogClose],
  templateUrl: './invite-usuario.component.html',
  styleUrl: './invite-usuario.component.css'
})
export class InviteUsuarioComponent {


    objUserProyecto: ProyectoUser ={
      descripcion:"",
      proyecto:{
        idProyecto:-1
      },
      usuario:{
        idUsuario:-1
      }
    }


    lstProyecto: Proyecto[]=[];

    lstUser: UsuarioRegistrer[]=[];

      formRegistrar = this.formBuilder.group({
        ValidaDescripcion: ['', [Validators.required]],
        validaProyecto: ['', [Validators.min(1)]],
        validaUsuario: ['', [Validators.min(1)]]
      });


        constructor( private proyecService:ProyectoService,
          @Inject(MAT_DIALOG_DATA) public data: UsuarioRegistrer,
          private formBuilder: FormBuilder){

            this.proyecService.GetProyect().subscribe(
              x => this.lstProyecto = x
            );


            this.proyecService.GetUserkAll().subscribe(
              x => this.lstUser = x
            );

        }



  Registrar(){


      console.log(">>> actualiazar [inicio]");
      console.log("invitado" + this.objUserProyecto.usuario);
      console.log("invitado" + this.objUserProyecto.proyecto);
      this.proyecService.registrarUserInvitacion(this.objUserProyecto).subscribe(
        x => {
          Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: x.mensaje,
          });

        },
      );
    }


}
