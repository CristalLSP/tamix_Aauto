import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  registrar() {
    // Aquí puedes añadir la lógica para validar los campos y enviar los datos al servidor
    console.log('Nombre:', this.nombre);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);


      // Redirige a la página de inicio de sesión (login)
      this.router.navigate(['/login']);
    }
    
  }

