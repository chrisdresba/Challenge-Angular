import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { SesionGuard } from './guard/sesion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'home',
    component : HomeComponent,
    canActivate: [SesionGuard] 
  },
  {
    path: 'platos',
    component : BusquedaComponent,
    canActivate: [SesionGuard] 
  },{
    path: '**',
    component :Page404Component,
    canActivate: [SesionGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
