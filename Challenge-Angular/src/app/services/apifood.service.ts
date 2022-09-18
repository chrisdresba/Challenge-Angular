import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plato } from '../entidades/plato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApifoodService {

  url: string = environment.urlFood;
  keyApi: string = environment.keyApi;
  constructor(private http: HttpClient) { 
  }

  getFood(busqueda: string) {
    return this.http.get<any>(`${this.url}complexSearch?apiKey=${this.keyApi}&query=${busqueda}&addRecipeInformation=true&addRecipeNutrition=true`);
  }

}
