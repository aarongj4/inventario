import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { Historial } from '../../interfaces/IHistorial';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [NgbTooltip, NavComponent, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ConfigService],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  historial: Array<Historial> = [];

  historialFiltrado: any = [];
  tpMov = 'Todos';

  constructor(
    private configService: ConfigService,
  ){
    this.obtenerHistorial()
  }

  obtenerHistorial(){

    this.configService.obtenerHistorial()
      .subscribe({
        next: (result: any) => {
          console.log('result');
          console.log(result);
          this.historial = result;
          this.historialFiltrado = [...this.historial];



        }
      })

  }

  filtroHistorial() {

    if( this.tpMov === 'Todos' ){
      this.historialFiltrado = [...this.historial];
    }else{

      this.historialFiltrado = this.historial.filter(item => item.tipoMovimiento === this.tpMov);
    }


  }

}
