import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';
import { Tarea } from '../../models/tarea.model';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-tarea',
  standalone: true,
  imports: [MenuComponent , AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule ,RouterLink],
  templateUrl: './registrar-tarea.component.html',
  styleUrl: './registrar-tarea.component.css'
})
export class RegistrarTareaComponent {




  lstProyecto: Proyecto[]=[];

  objtarea:Tarea={
    nombre:'',
    descripcion:'',
    fechaVencimiento:new Date(),
    prioridad:-1,
    proyecto: { idProyecto: -1 }
  }


  formRegistrar = this.formBuilder.group({
    validaNombre: ['', [Validators.required]],
    validaDescripcion: ['', [Validators.required]],
    validaVencimiento: ['', [Validators.required]],
    validaprioridad: ['', [Validators.min(1)]],
    validaProyecto: ['', [Validators.min(1)]],
});



  prioridad: number[] = [1, 2, 3, 4];

  listaProyect:Proyecto[]=[];




  constructor( private proyecService:ProyectoService,
    private formBuilder: FormBuilder
  ){
    this.proyecService.GetProyect().subscribe(
      x => this.lstProyecto = x
    );
  }
  // ngOnInit(): void {
  //   this.listaProyectos();
  //   console.log(this.formRegistrar);
  // }


  registra(){
  // LLENANDO LA DATA Q FALTA AL OBJETO EJEMPLO PA REGISTRAR
  console.log(">>> registra [inicio]");
  // console.log(this.tarea);

  // ENVIANDO LA DATA CARGADA
  // this.proyecService.registrarTarea(this.tarea).subscribe(
  //   x=>{
  //         Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
  //         this.tarea ={
  //                nombre:"",
  //               descripcion: "",
  //               fechaVencimiento:new Date(),
  //               prioridad:-1,
  //               idProyecto:{
  //                 idProyecto:-1
  //               }
  //             }
  //     }
  // );
  this.proyecService.registrarTarea(this.objtarea).subscribe(
    x => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: x.mensaje,
      })
    },
  );
}
  }



      // LISTAR COMBO CUANDO SELECCIONES OTRO COMBO OSEA RELACIONA SEGUN Q DISTRITO HAYAS SELECCIONADO
    //   listaProyectos(){
    //     // console.log("listaProvincia>>> " + this.proyecService.ubigeo?.departamento);
    //     this.proyecService.GetProyect().subscribe(
    //         x => this.listaProyect = x
    //     );
    // }



