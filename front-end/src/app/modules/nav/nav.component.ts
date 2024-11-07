import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {


  rol;

  constructor(
    private router: Router
  ){
    this.rol = sessionStorage.getItem("idRol");

  }

  direccionamiento(url: string){
    console.log(url);
    this.router.navigate(['/'+url])
  }

  logOut(){
    sessionStorage.clear();
    this.direccionamiento('login');
  }

}
