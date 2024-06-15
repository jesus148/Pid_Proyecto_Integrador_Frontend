import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { Ejemplo } from '../../models/ejemplo.model';
import { EjemploService } from '../../services/ejemplo.service';
import { TokenService } from '../../security/token.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-crud-ejemplo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-ejemplo.component.html',
  styleUrl: './crud-ejemplo.component.css'
})
export class CrudEjemploComponent {

    //Datos para la Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera
    displayedColumns = ["idEjemplo","descripcion","dias","longitud","pais","ubigeo","estado", "acciones"];

    //filtro de la consulta
    filtro: string = "";
  
    objUsuario: Usuario = {} ;
    
    constructor(private dialogService: MatDialog, 
                private ejemploService: EjemploService,
                private tokenService: TokenService ){
        this.objUsuario.idUsuario = tokenService.getUserId();
    }

    refreshTable(){
        console.log(">>> refreshTable [ini]");
        var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
        this.ejemploService.consultarCrud(msgFiltro).subscribe(
              x => {
                this.dataSource = new MatTableDataSource<Ejemplo>(x);
                this.dataSource.paginator = this.paginator
              }
        );

        console.log(">>> refreshTable [fin]");
    }

  

}
