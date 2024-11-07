import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private apiUrl = 'https://localhost/Inventario/';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<any> {
    return this.http.get(this.apiUrl+'obtener_productos');
  }

  obtenerHistorial(): Observable<any> {
    return this.http.get(this.apiUrl+'obtener_historial');
  }

  crearProducto(producto: any): Observable<any> {

    return this.http.post(this.apiUrl, producto);
  }

  actualizarProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }

  actualizarEstatusProducto(idProducto: number, estatus: number): Observable<any> {
    const data = { idProducto, estatus };
    return this.http.post(this.apiUrl, data);
  }



}
