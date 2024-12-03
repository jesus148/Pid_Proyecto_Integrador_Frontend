import { Routes } from '@angular/router';


import { AgregarEjemploComponent } from './components/agregar-ejemplo/agregar-ejemplo.component';
import { AgregarCoordenadaComponent } from './components/agregar-coordenada/agregar-coordenada.component';
import { AgregarCuentaComponent } from './components/agregar-cuenta/agregar-cuenta.component';
import { AgregarDataCatalogoComponent } from './components/agregar-data-catalogo/agregar-data-catalogo.component';
import { AgregarEntidadFinancieraComponent } from './components/agregar-entidad-financiera/agregar-entidad-financiera.component';
import { AgregarGrupoComponent } from './components/agregar-grupo/agregar-grupo.component';
import { AgregarMontoPrestamoComponent } from './components/agregar-monto-prestamo/agregar-monto-prestamo.component';
import { AgregarPrestatarioComponent } from './components/agregar-prestatario/agregar-prestatario.component';
import { AgregarSolicitudPrestamoComponent } from './components/agregar-solicitud-prestamo/agregar-solicitud-prestamo.component';
import { CrudEjemploComponent } from './components/crud-ejemplo/crud-ejemplo.component';
import { ConsultaEjemploComponent } from './components/consulta-ejemplo/consulta-ejemplo.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { IndexComponent } from './index/index.component';
import { RegistrarProyectoComponent } from './components/registrar-proyecto/registrar-proyecto.component';
import { RegistrarTareaComponent } from './components/registrar-tarea/registrar-tarea.component';




export const routes: Routes = [
  { path: '', component: IndexComponent },
  {path:"verRegistroCoordenada", component:AgregarCoordenadaComponent },
  {path:"verRegistroCuenta", component:AgregarCuentaComponent },
  {path:"verRegistroDataCatalogo", component:AgregarDataCatalogoComponent },
  {path:"verRegistroEntidadFinanciera", component:AgregarEntidadFinancieraComponent },
  {path:"verRegistroGrupo", component:AgregarGrupoComponent },
  {path:"verRegistroMontoPrestamo", component:AgregarMontoPrestamoComponent },
  {path:"verRegistroPrestatario", component:AgregarPrestatarioComponent },
  {path:"verRegistroSolicitudPrestamo", component:AgregarSolicitudPrestamoComponent },
  {path:"verRegistroEjemplo", component:AgregarEjemploComponent },
  {path:"verRegistrarProyecto", component:RegistrarProyectoComponent },
  {path:"verRegistrarTarea", component:RegistrarTareaComponent },

  {path:"verCrudEjemplo", component:CrudEjemploComponent },
  {path:"verConsultaEjemplo", component: ConsultaEjemploComponent },


  { path: 'login', component: LoginComponent },
  { path: 'Registrer', component: RegistrerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

