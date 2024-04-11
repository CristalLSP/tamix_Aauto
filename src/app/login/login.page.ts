import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    // Verificar si el correo electrónico es el del administrador
    if (this.email === 'admin@example.com') {
      // Redirigir a la página de administrador
      this.router.navigate(['/admin']);
    } else {
      // Redirigir a la página de reservación para otros usuarios
      this.router.navigate(['/reservacion']);
    }
  }
}