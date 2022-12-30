import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
  public auth: boolean = false;
  public sesion: boolean = false;

  constructor(public router: Router,public api: ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem('tokenAlkemy')) {
      this.usuarioLogin = localStorage.getItem('sesionUsuario');
      this.sesion = true;
    }
    if (!this.sesion) {
      this.auth = false;
    } else {
      this.auth = true;
    }
  }

  async redirigirLogin() {
    this.router.navigate(['/login']);
  }

  async cerrarSesion() {
    localStorage.removeItem('tokenAlkemy');
    localStorage.removeItem('sesionUsuario');
    this.api.sesionDesc();
    this.auth = false;
    this.router.navigate(['/login']);
  }

  async rotate(){
    this.btnMain = 'rotate';
    setTimeout(()=>{
      this.btnMain = '';
    },2000);
  }

}
