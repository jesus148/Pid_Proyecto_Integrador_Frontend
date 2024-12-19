import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tarea } from '../../models/tarea.model';
import { Comentario } from '../../models/comentario.model';
import { ProyectoService } from '../../services/proyecto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-comentary',
  standalone: true,
  imports: [     MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './add-comentary.component.html',
  styleUrl: './add-comentary.component.css'
})
export class AddComentaryComponent {



  objComentario: Comentario ={
    descripcion:"",
    tarea:{
      idTarea:-1
    }
  }


  formRegistrar = this.formBuilder.group({
    ValidaDescripcion: ['', [Validators.required]],
  });

  id:number | undefined;

  constructor( private proyecService:ProyectoService,
    @Inject(MAT_DIALOG_DATA) public data: Tarea,
    private formBuilder: FormBuilder){
      this.id = data?.idTarea;


  if (this.objComentario?.tarea) {
    this.objComentario.tarea.idTarea = this.id !== undefined ? this.id : -1;
  }
  }




  Registrar(){

      console.log(">>> actualiazar [inicio]");
      this.proyecService.registrarComentary(this.objComentario).subscribe(
        x => {
          Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: x.mensaje,
          });
          this.objComentario ={
            descripcion:"",
            tarea:{
              idTarea:-1
            }
          }
        },
      );
    }


}
