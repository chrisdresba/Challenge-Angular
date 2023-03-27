import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  usuarioLogin: any;
  estado: any;
  btnMain: string = "";
  public tituloBtn: string = '';
  public auth = this.service.isSesion;
  public sesion: boolean = false;

  constructor(public router: Router,public api: ApiService, public service: SesionService) { 
    this.auth = this.service.isSesion;
  }

  ngOnInit(): void {
    if (localStorage.getItem('tokenAlkemy')) {
      this.usuarioLogin = localStorage.getItem('sesionUsuario');
      this.sesion = true;
      this.service.show();
    }else{
      this.service.hide();
    }
  }

  async redirigirLogin() {
    this.router.navigate(['/login']);
  }

  async cerrarSesion() {
    localStorage.removeItem('tokenAlkemy');
    localStorage.removeItem('sesionUsuario');
    this.api.sesionDesc();
    this.service.hide();
    this.router.navigate(['/login']);
  }

  async rotate(){
    this.btnMain = 'rotate';
    setTimeout(()=>{
      this.btnMain = '';
    },2000);
  }

}
