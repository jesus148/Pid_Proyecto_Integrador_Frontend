import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { LoginUsuario } from '../../security/login-usuario';
import { TokenService } from '../../security/token.service';
import { AuthService } from '../../security/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule ,RouterLink ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  isLoading = false; // Variable que controla el estado de carga
  loginUsuario: LoginUsuario = {};
  roles: string[] = [];
  errMsj!: string;

  formLogin = this.formBuilder.group({
    validaUsername: ['', [Validators.required]],
    validaPassword:['', [Validators.required]]
});

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    console.log("constructor >> constructor >>> " + this.tokenService.getToken());
   }

  ngOnInit() {


    if (this.tokenService.getToken()) {
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
   }

  }

    // contraseña input
    hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }



  onLogin(): void {
    this.isLoading = true; // Activa el loading screen cuando se hace clic en "Ingresar"
    this.authService.login(this.loginUsuario).subscribe(
      (data:any) => {
          this.isLogged = true;
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.login);
          this.tokenService.setUserNameComplete(data.nombreCompleto)
          this.tokenService.setAuthorities(data.authorities);
          this.tokenService.setUserId(data.idUsuario);
          this.tokenService.setOpciones(data.opciones);

          this.roles = data.authorities;
          this.router.navigate(['/']);

           // Detiene el loading
        this.isLoading = false;

          console.log("onLogin() >> token >>> " +  this.tokenService.getToken());
          console.log("onLogin() >> setUserName >>> " +  this.tokenService.getUserName());
          console.log("onLogin() >> setUserNameComplete >>> " +  this.tokenService.getUserNameComplete());
          console.log("onLogin() >> idUsuario >>> " +  this.tokenService.getUserId());
          console.log("onLogin() >> roles >>> " +  this.tokenService.getAuthorities());
          console.log("onLogin() >> opciones >>> INICIO >> " );
          this.tokenService.getOpciones().forEach(obj => {
            console.log(" >> onLogin() >> " +  obj.nombre );
          });
          console.log("onLogin() >> opciones >>> FIN >> " );
      },
      (err:any) => {
          this.isLogged = false;
          this.errMsj = err.message;
          console.log(err);


             // Detiene el loading y muestra el error
        this.isLoading = false;
          if (err.status == 401){

              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Usuario no Autorizado",
              })

          }
      }
    );
  }

}
