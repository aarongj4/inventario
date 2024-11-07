import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { HistorialComponent } from './modules/historial/historial.component';
import { ProductosComponent } from './modules/productos/productos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '**', component: LoginComponent }
];
