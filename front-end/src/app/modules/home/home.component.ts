import { Component, Inject } from '@angular/core';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Producto } from '../../interfaces/IProducto';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbTooltip, NavComponent, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ConfigService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  productos: Array<Producto> = [];
  rol;
  idUsuario;

  cantidadActual: number = 0;

  editProductosForm = new FormGroup({
    ProductoID: new FormControl(),
    Nombre: new FormControl(''),
    Precio: new FormControl(),
    Cantidad: new FormControl(),

  })

  constructor(
    private router: Router,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService
  ) {
    this.obtenerProductos();
    this.rol = sessionStorage.getItem("idRol");
    this.idUsuario = sessionStorage.getItem("idUsuario");
  }


  direccionamiento(url: string) {
    this.router.navigate(['/' + url])

  }

  obtenerProductos() {

    this.configService.obtenerProductos()
      .subscribe({
        next: (result: any) => {

          this.productos = result;


        }
      })


  }

  actualizarEstado(idProducto: number, estatus: number) {
    if (estatus == 1) {
      estatus = 0
    } else {
      estatus = 1

    }

    this.configService.actualizarEstatusProducto(idProducto, estatus)
    .subscribe({
      next: (result: any) => {
        this.alertifyService.success('Se ha actualizado el estado')
        },
        complete: () => {
          this.obtenerProductos();
        },

      })

  }

  guardarInventario(){

    if( this.rol == '2'){
      if ( this.editProductosForm.controls.Cantidad.value > this.cantidadActual ) {
        this.alertifyService.error('La cantidad debe ser menor a la actual o igual que ('+this.cantidadActual+')')

      }else if ( this.editProductosForm.controls.Cantidad.value < 0  ) {
        this.alertifyService.error('Error numeros negativos')

      }
      else{

        this.actualizarInventario()
      }
    }else{
      // sumar inventario
      // administrador
      // agregar inventario
      if ( this.editProductosForm.controls.Cantidad.value <= this.cantidadActual ) {
        this.alertifyService.error('La cantidad debe ser mayor a la actual ('+this.cantidadActual+')')

      }else{
        this.actualizarInventario()
      }
    }




  }

  actualizarInventario(){
    // actualizar
    let producto = {
      idProducto:   this.editProductosForm.controls.ProductoID.value,
      idUsuario:   this.idUsuario,
      nombre:   this.editProductosForm.controls.Nombre.value,
      precio:   this.editProductosForm.controls.Precio.value,
      cantidad: this.editProductosForm.controls.Cantidad.value,
    };

    console.log('actualizar productos');
    console.log(producto);



    this.configService.actualizarProducto( producto )
    .subscribe({
      next: (result: any) => {
        this.alertifyService.success('Se ha actualizado el inventario')
        this.closeModal();
        this.editProductosForm.reset();
        this.obtenerProductos();

      },

    })
  }

  selectProducto(producto: Producto){

    this.cantidadActual = producto.cantidad;

    this.editProductosForm.controls.ProductoID.setValue(producto.idProducto)
    this.editProductosForm.controls.Nombre.setValue(producto.nombre)
    this.editProductosForm.controls.Precio.setValue(producto.precio)
    this.editProductosForm.controls.Cantidad.setValue(producto.cantidad)

    this.editProductosForm.controls.Nombre.disable()
    this.editProductosForm.controls.Precio.disable()


  }

  closeModal(){
    this.modalService.dismissAll();
  }

}
