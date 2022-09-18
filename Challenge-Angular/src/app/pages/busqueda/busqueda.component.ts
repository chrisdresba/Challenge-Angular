import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/entidades/plato';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  arrayPlatos: Plato [] = [];
  constructor() { }

  ngOnInit(): void {
  }

  obtenerListado(listado: any) {
    this.arrayPlatos = listado;
  }
}
