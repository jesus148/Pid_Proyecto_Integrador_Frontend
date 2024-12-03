import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';

@Component({
  selector: 'app-registrar-tarea',
  standalone: true,
  imports: [MenuComponent , AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule ,RouterLink],
  templateUrl: './registrar-tarea.component.html',
  styleUrl: './registrar-tarea.component.css'
})
export class RegistrarTareaComponent {

}
