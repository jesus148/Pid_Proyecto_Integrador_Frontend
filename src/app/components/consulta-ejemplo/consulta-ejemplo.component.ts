import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { UtilService } from '../../services/util.service';
import { EjemploService } from '../../services/ejemplo.service';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-consulta-ejemplo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-ejemplo.component.html',
  styleUrl: './consulta-ejemplo.component.css'
})
export class ConsultaEjemploComponent {

    
  //lista de paises
  lstPais: Pais[] = [];

  //lista de días
  lstDias : DataCatalogo[] = [];

  //Filtro de la consulta
  descripcion: string = "";
  idPais: string = "-1";
  estado: boolean = true;
  longitud: number = 0;
  idDias:  string = "-1";
 
  //Datos para la Grila
  dataSource:any;

  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idEjemplo","descripcion","dias","longitud","pais","ubigeo","estado"];

  constructor(private ejemploService: EjemploService,
              private utilService: UtilService) {
  }
  
  ngOnInit() {
      console.log(">>> ngOnInit [ini]");
      this.utilService.listaPais().subscribe(
        data => { this.lstPais = data; }
      );
      this.utilService.listaDiasPrestamo().subscribe(
        data => {this.lstDias = data; }
      );
      console.log(">>> ngOnInit [fin]");
  }

  consultar() {
    console.log(">>> consultar [ini]");
    console.log("descripcion: ", this.descripcion);
    console.log("idPais: ", this.idPais);
    console.log("estado: ", this.estado);
    console.log("longitud: ", this.longitud);
    console.log("idDias: ", this.idDias);
    

    this.ejemploService.consultaEjemplo(this.descripcion,
      this.idPais,
      this.estado ? 1 : 0,
      this.longitud.toString() == "" ? -1 : this.longitud,
      this.idDias).subscribe(
      data => {
        this.dataSource = data;
        this.dataSource.paginator = this.paginator;
      }
    );
    console.log(">>> consultar [fin]");
  }


}
