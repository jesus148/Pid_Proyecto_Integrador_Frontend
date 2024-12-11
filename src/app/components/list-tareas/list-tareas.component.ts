import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../security/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProyectoService } from '../../services/proyecto.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { Tarea } from '../../models/tarea.model';
import { ActualizarTaskComponent } from '../actualizar-task/actualizar-task.component';




@Component({
  selector: 'app-list-tareas',
  standalone: true,
  imports: [MenuComponent , MatTableModule, MatIconModule ],
  templateUrl: './list-tareas.component.html',
  styleUrl: './list-tareas.component.css'
})
export class ListTareasComponent {




  dataSource:any;

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["nombre","descripcion","fechaVencimiento","estadoTarea","proyecto", "usuario" , "Acciones"] ;

  constructor(private dialogService: MatDialog, //importar esto para los modales
    private tokenService: TokenService,
    private proyecService:ProyectoService){
  }
  ngOnInit(): void {
    this.obtenerTareas();
  }



  obtenerTareas(){
          this.proyecService.GetTaskAll().subscribe( data =>{
            // table agrega data
            this.dataSource = data;
  } )
  }



  openDialogActualizar(obj: Tarea) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("obj: ", obj);





       // llama al modal o al otro componnete pa q se muestre y le envia el objeto solo 1
    // osea pa actualizar le envia todo el objeto
    // en el CrudEjemploActualizarComponent lo recibe en el constructor  @Inject(MAT_DIALOG_DATA) public data: Ejemplo
    const dialogRef = this.dialogService.open(ActualizarTaskComponent, {data: obj,
      disableClose:true,
    } );
    dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
                    // [mat-dialog-close]  es diferente a 0 y envia el 1 osea esta registrando
    // refrescara la tabla para ver el registro osea lista todo
        if (result != null && (result === 1 || result === 2)) {
          this.obtenerTareas();
        }
    });
    console.log(">>> openDialogActualizar [fin]");
    }




  DeleteTask(idTarea : number){
    this.proyecService.DeleteTask(idTarea).subscribe((data:any)=>{
      this.obtenerTareas();
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: data.mensaje,
      })
    })
  }

}
