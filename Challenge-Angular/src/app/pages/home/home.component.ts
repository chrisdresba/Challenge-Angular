import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  public menu: any;
  public platoSeleccionado: any;
  public viewDetail: boolean = false;

  constructor(public menuServ: MenuService,public service: SesionService,public afAuth: AngularFireAuth,public routeo: Router) {
    this.menu = this.menuServ.menu;
  }

  ngOnInit(): void {
    this.menu = this.menuServ.menu;
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.service.show();
      }else{
        this.service.hide();
        this.routeo.navigate(['/login']);
      }
    })
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
