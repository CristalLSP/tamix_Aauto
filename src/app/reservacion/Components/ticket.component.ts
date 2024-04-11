import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from './ticket.model';
import html2canvas from 'html2canvas';
import './ticket.component.scss'; // Importación del archivo SCSS

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'] // Ruta al archivo SCSS
})


export class TicketComponent { 
  @Input() ticket: Ticket = { nombre:'', apellidoPaterno:'', apellidoMaterno:'', destino: '', telefono: '', asientos: [], total: 0 };
  ticketImage: string | ArrayBuffer | null = null;

  constructor(private router: Router) { }

  generateTicketImage() {
    setTimeout(() => {
      const ticketContent = document.getElementById('ticket-content');
      if (ticketContent) {
        html2canvas(ticketContent).then(canvas => {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const watermark = new Image();
            watermark.src = 'assets/watermaker.png';
            watermark.onload = () => {
              const x = (canvas.width - watermark.width) / 2;
              const y = (canvas.height - watermark.height) / 2;
              ctx.globalAlpha = 0.5; // Opacidad del 50%
              ctx.drawImage(watermark, x, y);
              this.ticketImage = canvas.toDataURL('image/png');
            };
            watermark.onerror = () => {
              console.error('Error al cargar la imagen de marca de agua');
            };
          }
        });
      } else {
        console.error('No se pudo encontrar el elemento ticket-content en el DOM.');
      }
    }, 500);
  }

  downloadTicketImage() {
    const link = document.createElement('a');
    link.href = this.ticketImage as string;
    link.download = 'ticket.png';
    link.click();
  }

  goToLogin() {
    this.router.navigate(['/login']); 
  }
}

