import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = environment.urlAuth; 
  estadoSesion?:boolean;

  constructor(private http:HttpClient,  private firestore: AngularFirestore) { 

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

  async crearDatos(collection:any,item:any){
    return await this.firestore.collection(collection).add(item);
  }


}
