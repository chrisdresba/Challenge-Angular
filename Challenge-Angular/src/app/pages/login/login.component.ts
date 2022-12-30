import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  formularioRegistro: FormGroup;
  public loading: boolean = true;
  public view: boolean = false;

  constructor(public router: Router, public fb: FormBuilder, private api: ApiService,public afAuth: AngularFireAuth) {
    this.formularioLogin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],
    })

    this.formularioRegistro = this.fb.group({
      'nombre': ['', [Validators.required, Validators.maxLength(20)]],
      'email': ['', [Validators.required, Validators.email]],
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],
      'contraseñaRev': ['', [Validators.required, Validators.minLength(6)]],
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
     //   this.api.Login(usuario.usuario, usuario.contraseña).subscribe((data: any) => {
          this.afAuth.signInWithEmailAndPassword(usuario.usuario, usuario.contraseña).then(res => {
            localStorage.setItem('tokenAlkemy', environment.keyApi);
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

  async registrar(){

  try {
      const nombre  =  this.formularioRegistro.value.nombre;
      const email =  this.formularioRegistro.value.email;
      const password = this.formularioRegistro.value.contraseña;
      const passwordAux = this.formularioRegistro.value.contraseñaRev;

      if (this.validarEmail(email) && this.validarContraseña(password) && this.validarContraseña(passwordAux)) {
        if(password == passwordAux){

        let usuario = new Usuario();
        usuario.iniciar(email, password); 
        this.afAuth.createUserWithEmailAndPassword(usuario.usuario, usuario.contraseña).then(res => {
          localStorage.setItem('tokenAlkemy', environment.keyApi);
          localStorage.setItem('sesionUsuario', usuario.usuario);
          this.api.sesionActiva();
          this.loading = true;
          this.guardarUsuario(nombre, email);

          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 2500)

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `El usuario ${usuario.usuario} se a registrado con exito!`,
            showConfirmButton: false,
            timer: 1500
          })
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'El email ya se encuentra registrado!'
          })
        })

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Las contraseñas deben ser iguales!'
        })
      }

      }

      if (!this.validarEmail(email) && !this.validarContraseña(password)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'El email y la contraseña son incorrectos!'
        })
      } else if (!this.validarEmail(email) && this.validarContraseña(password)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Debe ingresar un email!'
        })
      } else if (this.validarEmail(email) && !this.validarContraseña(password)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'La contraseña debe tener un minimo de 6 caracteres!'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El email o la contraseña son incorrectos!'
      })
    }

  }

  async ingresarInvitado() {
    this.formularioLogin.controls["email"].setValue('challenge@alkemy.org');
    this.formularioLogin.controls["contraseña"].setValue('123456');
  }

  viewForm(value : boolean){
    this.view = value;
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

  guardarUsuario(nombre: any, email: any) {
    let user = {
      'nombre': nombre,
      'usuario': email,
    }
    this.api.crearDatos('usuarios', user);
  }

}
