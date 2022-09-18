import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = environment.urlAuth; 
  estadoSesion?:boolean;

  constructor(private http:HttpClient) { 

  }

  Login(email:string,contraseña:string){
    let ingreso = {
      'email': email,
      'password': contraseña
    }
    return this.http.post(this.url,ingreso);
  }

  sesionActiva(){
    this.estadoSesion = true;
  }

  sesionDesc(){
    this.estadoSesion = false;
  }

}
