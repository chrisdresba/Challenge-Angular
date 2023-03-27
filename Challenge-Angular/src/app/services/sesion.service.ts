import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  isSesion = new Subject<boolean>();

  constructor(){
  }

  show(): void {
    this.isSesion.next(true);
  }

  hide(): void {
    this.isSesion.next(false);
  }
}
