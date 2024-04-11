import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';

@NgModule({
  declarations: [TicketComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [TicketComponent]
})
export class TicketModule {}
