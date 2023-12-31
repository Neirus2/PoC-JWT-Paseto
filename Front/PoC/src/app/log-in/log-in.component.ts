import { Component, OnInit } from '@angular/core';
import { AuthService } from "services/auth-service.service";
import { Router } from "@angular/router";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  user = {
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
   
  ) {  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    }
sanitizeInput(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }
  logIn () {
    //this.user.email = this.sanitizeInput(this.user.email) as string;
    // this.user.password = this.sanitizeInput(this.user.password) as string;
    this.authService.logIn(this.user) 
      .subscribe(
        res => {
          console.log(res);

          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);

        // Personaliza el mensaje de error en función del tipo de error
        let errorMessage = 'Inicio de sesión fallido. Por favor, inténtelo de nuevo.';

        if (err.status === 401) {
          errorMessage = 'Credenciales incorrectas. Por favor, verifique su nombre de usuario y contraseña.';
        } else if (err.status === 403) {
          errorMessage = 'Acceso denegado. No tiene permiso para acceder a esta página.';
        } // Agrega más condiciones según los tipos de error que esperas

        // Muestra la alerta de error con el mensaje personalizado
        Swal.fire({
          icon: 'error',
          title: 'Inicio de sesión fallido',
          text: err.error,
          timer: 1000,
        });
        }
      );
  }

}

