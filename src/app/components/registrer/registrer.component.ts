import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioRegistrer } from '../../models/UsuariosRegistrer';
import { UtilService } from '../../services/util.service';
import { UsuarioRegistro } from '../../services/usuario.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';

// Función validadora personalizada para la edad
export function ageValidator(control: AbstractControl): ValidationErrors | null {
  const birthDate = control.value;
  if (!birthDate) return null; // Si no hay fecha, no validamos

  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const month = currentDate.getMonth() - birthDate.getMonth();
  const day = currentDate.getDate() - birthDate.getDate();

  // Validación de edad (18 años)
  const validAge = age > 18 || (age === 18 && (month > 0 || (month === 0 && day >= 0)));
  
  return validAge ? null : { ageError: 'Debes tener al menos 18 años para registrarte' };
}

@Component({
  selector: 'app-registrer',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatDividerModule, MatIconModule, RouterLink, CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent {

  usuario: UsuarioRegistrer = {
    nombres: "",
    apellidos: "",
    dni: "",
    login: "",
    password: "",
    email: "",
    fechaNacimiento: new Date()
  };

  formRegistrar = this.formBuilder.group({
    validaNombres: ['', [Validators.required]],
    validaApellidos: ['', [Validators.required]],
    validaDni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    validaUserName: ['', [Validators.required, Validators.pattern('.{6,30}')]],
    validacontrasena: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>/\\[\\]~_+=;\'<>\\-])[A-Za-z\\d!@#$%^&*(),.?":{}|<>/\\[\\]~_+=;\'<>\\-]{8,}$'
        )
      ]
    ],
    validaEmail: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
    validaFechaInicio: ['', [Validators.required, ageValidator]], // Validación de edad personalizada
  });

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private utilservice: UtilService,
    private usuarioService: UsuarioRegistro,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  Registra() {
    this.usuarioService.RegistrarUser(this.usuario).subscribe(
      x => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
      },
    );
  }

  onKeyPress(event: KeyboardEvent, field: string): void {
    const charCode = event.charCode;
  
    // Si el campo es DNI (solo permitir números, máximo 8 dígitos)
    if (field === 'dni') {
      const currentValue = (event.target as HTMLInputElement).value.length;
      if ((charCode < 48 || charCode > 57) || currentValue >= 8) {
        event.preventDefault();  // Bloquear si no es un número o si supera los 8 dígitos
      }
    }
  
    // Si el campo es Nombres o Apellidos (solo permitir letras y espacios, mínimo 2 caracteres)
    if (field === 'nombres' || field === 'apellidos') {
      if (
        (charCode < 65 || charCode > 90) &&  // Mayúsculas A-Z
        (charCode < 97 || charCode > 122) &&  // Minúsculas a-z
        charCode !== 32  // Espacio
      ) {
        event.preventDefault();  // Bloquear caracteres no permitidos
      }
    }
  }
}