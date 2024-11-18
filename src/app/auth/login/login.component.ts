import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule , MatFormFieldModule, MatInputModule, MatDatepickerModule ,     MatDatepickerModule,
    MatNativeDateModule , MatButtonModule, MatDividerModule, MatIconModule , RouterLink ,CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  formLogin = this.formBuilder.group({
    validaUsername: ['', [Validators.required]],
    validaPassword:['', [Validators.required]]
});



  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
   }
  ngOnInit() {}

  // contraseña input
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


}
