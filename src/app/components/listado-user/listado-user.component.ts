import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../security/token.service';
import { ProyectoService } from '../../services/proyecto.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioRegistrer } from '../../models/UsuariosRegistrer';
import { InviteUsuarioComponent } from '../invite-usuario/invite-usuario.component';

@Component({
  selector: 'app-listado-user',
  standalone: true,
  imports: [MenuComponent , MatTableModule, MatIconModule , MatCheckboxModule, FormsModule , MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './listado-user.component.html',
  styleUrl: './listado-user.component.css'
})
export class ListadoUserComponent {

    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    filtro: string = "";

    dataSource:any;

  displayedColumns = ["nombres","apellidos","dni","nombreCompleto" ,"Acciones"] ;


      constructor(private dialogService: MatDialog, //importar esto para los modales
        private tokenService: TokenService,
        private proyecService:ProyectoService){
      }
      ngOnInit(): void {
        this.obtenerUsuarios();
      }


      obtenerUsuarios(){
        var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
        if(msgFiltro === "todos"){
          this.proyecService.GetUserkAll().subscribe( data =>{
            // table agrega data
            this.dataSource = data;
        } )

        }else{
          let numero = parseInt(msgFiltro);
          this.proyecService.consultarUserDni(numero).subscribe( data =>{
            // table agrega data
            this.dataSource = data;
        } )
        }
     }



     updateEstado(obj:UsuarioRegistrer){
console.log(">>> openDialogCommentary [ini]");
  // console.log("obj: ", obj);

     // llama al modal o al otro componnete pa q se muestre y le envia el objeto solo 1
  // osea pa actualizar le envia todo el objeto
  // en el CrudEjemploActualizarComponent lo recibe en el constructor  @Inject(MAT_DIALOG_DATA) public data: Ejemplo
  const dialogRef = this.dialogService.open(InviteUsuarioComponent, {data: obj,
    disableClose:true,
  } );
  dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
                  // [mat-dialog-close]  es diferente a 0 y envia el 1 osea esta registrando
  // refrescara la tabla para ver el registro osea lista todo
      if (result != null && (result === 1 || result === 2)) {
        // this.obtenerTareas();
      }
  });
  console.log(">>> openDialogActualizar [fin]");
     }



}
