import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public menu: any;
  public platoSeleccionado: any;
  public viewDetail: boolean = false;

  constructor(public menuServ: MenuService) {
    this.menu = this.menuServ.menu;
  }

  ngOnInit(): void {
    this.menu = this.menuServ.menu;
  }

  obtenerPlato(plato: any) {
    if (plato == undefined) {
      this.viewDetail = false;
    } else {
      this.platoSeleccionado = plato;
      this.viewDetail = true;
    }
  }

  obtenerEstado(estado: boolean) {
    if (!estado) {
      this.viewDetail = false;
    } else {
      this.viewDetail = true;
    }
  }

}
