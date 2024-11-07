import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost/Inventario/';

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<any> {

    const body = { correo, contrasena };
    return this.http.post(this.apiUrl+'login', body);
  }




}
