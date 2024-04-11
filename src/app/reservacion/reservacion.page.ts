import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
 import { TicketComponent } from './Components/ticket.component';
 import { Ticket } from './Components/ticket.model';


@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
})
export class ReservacionPage {
  ticket: Ticket;
  // Mapa de precios por destino
  destinoPrecios: { [key: string]: number } = {
    'Tamazulapam a San Juan del Río': 1000,
    'Tamazulapam a Escobedo': 1000,
    'Tamazulapam a Celaya': 1200,
    'Tamazulapam a Querétaro': 1000,
    'San Juan del Río a Tamazulapam': 1000,
    'Escobedo a Tamazulapam': 1000,
    'Celaya a Tamazulapam': 1200,
    'Querétaro a Tamazulapam': 1000,
  };
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  selectedDestino: string = '';
  telefono: string = '';
  asientos: { number: number, available: boolean, selected: boolean }[] = [];
  showErrors: boolean = false;
  destinos: string[] = [
    'Tamazulapam a San Juan del Río',
    'Tamazulapam a Escobedo',
    'Tamazulapam a Celaya',
    'Tamazulapam a Querétaro',
    'San Juan del Río a Tamazulapam',
    'Escobedo a Tamazulapam',
    'Celaya a Tamazulapam',
    'Querétaro a Tamazulapam',
  ];
  showTicketDetail: boolean = false; // Define la propiedad showTicketDetail y inicialízala en false

  constructor(private router: Router, private modalController: ModalController) {
    this.ticket = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      destino: '',
      telefono: '',
      asientos: [],
      total: 0 // Asegúrate de que total esté definido en tu modelo Ticket si es necesario
    };
    // Inicializar los asientos
    for (let i = 1; i <= 20; i++) {
      this.asientos.push({ number: i, available: true, selected: false });
    }
  }

  toggleSeat(seatNumber: number) {
    const seat = this.asientos.find(seat => seat.number === seatNumber);
    if (seat) {
      if (seat.available) {
        seat.selected = !seat.selected;
      }
    }
    this.updateSeatAvailability(); // Actualizar disponibilidad de asientos
  }

  updateSeatAvailability() {
    this.asientos.forEach(seat => {
      seat.available = !this.asientos.some(s => s.selected && s.number === seat.number);
    });
  }

  // Función para añadir un número al teléfono
  addToPhone(num: string) {
    if (this.telefono.length < 10) { // Limitar a 10 dígitos
      this.telefono += num;
    }
  }

  // Función para eliminar un número del teléfono
  deleteFromPhone() {
    this.telefono = this.telefono.slice(0, -1);
  }

  async bookTicket() {
    if (!this.selectedDestino || this.telefono.trim() === '' || this.asientos.filter(seat => seat.selected).length === 0) {
      this.showErrors = true;
      return;
    }
  
    // Asignar valores al objeto ticket
    this.ticket.nombre = this.nombre;
    this.ticket.apellidoPaterno = this.apellidoPaterno;
    this.ticket.apellidoMaterno = this.apellidoMaterno;
    this.ticket.destino = this.selectedDestino;
    this.ticket.telefono = this.telefono;
    this.ticket.asientos = this.asientos.filter(seat => seat.selected).map(seat => seat.number);
  
    // Calcular el total
    const destinosSeleccionados = this.selectedDestino.split(',');
    const total = destinosSeleccionados.reduce((acc, destino) => {
      const precio = this.destinoPrecios[destino.trim()];
      const asientosSeleccionados = this.asientos.filter(seat => seat.selected).length;
      return acc + (precio * asientosSeleccionados);
    }, 0);
  
    // Actualiza el objeto ticket con el total calculado
    this.ticket.total = total;
  
    const modal = await this.modalController.create({
      component: TicketComponent,
      componentProps: {
        ticket: this.ticket,
      },
    });
    await modal.present();
  }
}