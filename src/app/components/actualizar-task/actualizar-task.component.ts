import { Component, Inject } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarea } from '../../models/tarea.model';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../services/proyecto.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../app.material.module';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsuarioRegistrer } from '../../models/UsuariosRegistrer';

@Component({
  selector: 'app-actualizar-task',
  standalone: true,
  imports: [MenuComponent , AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule ,RouterLink,MatCheckboxModule, ],
  templateUrl: './actualizar-task.component.html',
  styleUrl: './actualizar-task.component.css'
})
export class ActualizarTaskComponent {

  lstProyecto: Proyecto[]=[];

  objtarea:Tarea={
    nombre:'',
    descripcion:'',
    fechaVencimiento:new Date(),
    prioridad:-1,
    estadoTarea:'',
    proyecto: { idProyecto: -1 },
    usuario: { idUsuario: -1  || null}
  }



  prioridad: number[] = [1, 2, 3, 4];


  estadoTarea: string[] = ["PENDIENTE", "PROGRESO", "DESARROLLADA", "RECHAZADA"];





  listaProyect:Proyecto[]=[];
  lstUser: UsuarioRegistrer[]=[];

  formRegistrar = this.formBuilder.group({
    validaNombre: ['', [Validators.required]],
    validaDescripcion: ['', [Validators.required]],
    validaVencimiento: ['', [Validators.required]],
    validaprioridad: ['', [Validators.min(1)]],
    validaProyecto: ['', [Validators.min(1)]],
    validaEstadoTarea: ['', [Validators.min(1)]],
    validaUsuarios: ['', [Validators.min(1)]]
});


  constructor(private proyecService:ProyectoService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Tarea
  ){
    this.proyecService.GetProyect().subscribe(
      x => this.lstProyecto = x
    );

    this.proyecService.GetUserkAll().subscribe(
      x => this.lstUser = x
    );
    // this.objtarea = data;
    this.objtarea = { ...data, proyecto: { ...data.proyecto } };
  }




  actualiazar(){

    console.log(">>> actualiazar [inicio]");


    this.proyecService.UpdateTask(this.objtarea).subscribe(
      x => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
        // this.objtarea={
        //   nombre:'',
        //   descripcion:'',
        //   estadoTarea:'',
        //   fechaVencimiento:new Date(),
        //   prioridad:-1,
        //   proyecto: { idProyecto: -1 },
        //   usuario:{
        //     idUsuario:-1
        //   }
        // }
      },
    );
  }


  salir() {

  }






}
