import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Plato } from '../entidades/plato';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: Array<Plato> = [];

  platoVegano: number = 0;
  platoNoVegano: number = 0;
  tiempoPreparacion: number = 0;
  healthScore: number = 0;
  precioTotal: number = 0;
  promedioTiempo: number = 0;
  promedioHealthScore: number = 0;

  constructor() { }

  addDish(plato: any): any {
    if (this.menu.length < 4) {
      if (this.validarTipo(plato)) {
        this.menu.push(plato);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se agrego correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.valoresAcumulados();
        return 0;
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No se pueden agregar mas de 4 platos',
        showConfirmButton: false,
        timer: 1500
      })
      return -1;
    }
  }

  removeDish(plato: any) {
    let index = this.menu.indexOf(plato);
    this.menu.splice(index, 1);
    this.valoresAcumulados();
    this.actualizarPlatos(plato); //actualiza la cantidad de tipos de platos
  }

  valoresAcumulados(): void {
    this.precioTotal = 0;
    this.promedioHealthScore = 0;
    this.promedioTiempo = 0;
    this.tiempoPreparacion = 0;
    this.healthScore = 0;
    let cantidad = this.menu.length;
    this.menu.forEach((plato: any) => {
      this.precioTotal += plato.price;
      this.tiempoPreparacion += plato.readyInMinutes;
      this.healthScore += plato.healthScore;
    });
    this.promedioHealthScore = this.healthScore / cantidad;
    this.promedioTiempo = this.tiempoPreparacion / cantidad;
  }


  validarTipo(plato: Plato): boolean {
    if (plato.vegan) {
      if (this.platoVegano < 2) {
        this.platoVegano++;
        return true
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Solo se pueden agregar 2 platos veganos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      if (this.platoNoVegano < 2) {
        this.platoNoVegano++;
        return true;
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Solo se pueden agregar más de 2 platos veganos, elija otro',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    return false;
  }

  actualizarPlatos(plato: any) {
    if (plato.vegan) {
      this.platoVegano--;
    } else {
      this.platoNoVegano--;
    }
  }

}
