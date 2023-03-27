import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Plato } from 'src/app/entidades/plato';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {

  arrayPlatos: Plato [] = [];
  
  constructor(public service: SesionService,public afAuth: AngularFireAuth,public routeo: Router) {

   }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.service.show();
      }else{
        this.service.hide();
        this.routeo.navigate(['/login']);
      }
    })
  }

  obtenerListado(listado: any) {
    this.arrayPlatos = listado;
  }
}
