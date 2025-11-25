import { Component, inject } from '@angular/core'; // <--- 1. IMPORTAMOS INJECT
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  public email: string = '';
  public password: string = '';
  public mensaje: string = '';

  // <--- 2. LA FORMA MODERNA DE INYECTAR EN ANGULAR 19
  // En lugar de ponerlo en el constructor, lo hacemos así:
  private http = inject(HttpClient); 

  constructor() {
     // El constructor queda vacío o lo puedes borrar si no haces nada más ahí
  }

  onSubmit() {
    const datos = {
      email: this.email,
      password: this.password
    };

    // Aquí usamos this.http igual que siempre
    this.http.post('http://localhost:3600/api/registro', datos)
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta:', response);
          this.mensaje = '¡Usuario registrado correctamente!';
          this.email = '';
          this.password = '';
        },
        error: (error) => {
          console.error('Error:', error);
          this.mensaje = 'Error al registrar usuario.';
        }
      });
  }
}