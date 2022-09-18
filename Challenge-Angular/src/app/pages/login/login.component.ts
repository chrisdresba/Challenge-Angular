import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  public loading: boolean = true;

  constructor(public router: Router, public fb: FormBuilder, private api: ApiService) {
    this.formularioLogin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'contraseña': ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }

  async ingresar() {
    try {
      let usuario = new Usuario();
      usuario.iniciar(this.formularioLogin.value.email, this.formularioLogin.value.contraseña);
      if (this.validarEmail(usuario.usuario) && this.validarContraseña(usuario.contraseña)) {
        this.api.Login(usuario.usuario, usuario.contraseña).subscribe((data: any) => {
            localStorage.setItem('tokenAlkemy', data.token);
            localStorage.setItem('sesionUsuario', usuario.usuario);
            this.api.sesionActiva();
            this.loading = true;
            setTimeout(() => {
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            }, 1500)
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'El usuario o la contraseña son incorrectos!'
          })
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'El usuario o la contraseña son incorrectos!'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })
    }

  }

  async ingresarInvitado() {
    this.formularioLogin.controls["email"].setValue('challenge@alkemy.org');
    this.formularioLogin.controls["contraseña"].setValue('react');
  }

  validarEmail(email: string) {
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  validarContraseña(contraseña: string) {
    if (contraseña.length >= 5) {
      return true;
    } else {
      return false;
    }
  }

}
