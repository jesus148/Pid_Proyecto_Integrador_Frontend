import { Component, signal } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../security/token.service';
import { AuthService } from '../../security/auth.service';
import { Proyecto } from '../../models/proyecto';
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../models/usurio.model';
import { ProyectoService } from '../../services/proyecto.service';
import Swal from 'sweetalert2';

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
    descripcion:''
    // fechaCreacion:new Date()
    // idUsuario:{
    //   idUsuario: -1
    // }
  }


  formRegistrar = this.formBuilder.group({
    validaNombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}$')]],
    validaDescripcion: ['', [Validators.required]],
});


  //usuario en sesion
  objUsuario: Usuario = {};



  // inicia
  constructor(
    // private tokenService: TokenService,
    // private utilService: UtilService,
    // private router: Router,
    private proyectService: ProyectoService,
    private formBuilder: FormBuilder,

  ) {
    // console.log("constructor >> constructor >>> " + this.tokenService.getToken());
   }

  ngOnInit() {
    // this.objUsuario.idUsuario = this.tokenService.getUserId();
 }




   hide = signal(true);
   clickEvent(event: MouseEvent) {
     this.hide.set(!this.hide());
     event.stopPropagation();
   }



   registra(){

    console.log(">>> registra [inicio]");
    // this.proyecto.idUsuario = this.objUsuario;
    console.log(this.proyecto);

         // ENVIANDO LA DATA CARGADA
        //  this.proyectService.registrarProyecto(this.proyecto).subscribe(
        //   x=>{
        //         Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
        //         this.proyecto ={
        //           nombre:'',
        //           descripcion:'',
        //           // fechaCreacion:new Date(),
        //           // idUsuario:{
        //           //   idUsuario: -1
        //           // }
        //             }
        //     }
        // );

        this.proyectService.registrarProyecto(this.proyecto).subscribe(
          x => {
            Swal.fire({
              icon: 'info',
              title: 'Resultado del Registro',
              text: x.mensaje,
            })
            // Reinicia el objeto proyecto
            // this.proyecto = {
            //   nombre: '',
            //   descripcion: '',
            // };
          },
        );

   }
}
