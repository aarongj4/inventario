import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgbTooltip, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),

  })

  constructor(
    private loginService: LoginService,
    private alertifyService: AlertifyService,
    private router: Router,

  ){

  }



  iniciarSesion(){

    console.log('correo: ',this.loginForm.controls.correo.value)
    console.log('contrasena: ',this.loginForm.controls.contrasena.value)


    if (this.loginForm.valid) {
      // valid
      this.loginService.login( this.loginForm.controls.correo.value!, this.loginForm.controls.contrasena.value! )
      .subscribe({
        next: (result: any) => {


          if (result.status == 'error') {
            this.alertifyService.error(result.mensaje)

          }else if(result.status == 'success'){

            sessionStorage.setItem("idUsuario", result.data['idUsuario'])
            sessionStorage.setItem("idRol", result.data['idRol'])
            this.router.navigate(['/home'])
          }


        },

      })
    }else{

      this.alertifyService.error('Ingresa tus datos')
    }

  }

}
