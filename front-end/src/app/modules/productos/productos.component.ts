import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ConfigService, AlertifyService],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productosForm = new FormGroup({
    Nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    Precio: new FormControl('', [Validators.required, Validators.min(10)] ),
    Cantidad: new FormControl(0),

  })

  constructor(
    private configService: ConfigService,
    private alertifyService: AlertifyService
  ) {
    this.productosForm.controls.Cantidad.disable()
  }


  agregarProducto(){

    let producto = {
      nombre:   this.productosForm.controls.Nombre.value,
      precio:   this.productosForm.controls.Precio.value,
      cantidad: this.productosForm.controls.Cantidad.value,
    };

    this.configService.crearProducto( producto )
    .subscribe({
      next: (result: any) => {
        this.alertifyService.success('Se ha registrado correctamente el producto')
        this.productosForm.reset()
      },

    })



  }

}
