import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate {



  constructor(private router: Router, public api:ApiService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = localStorage.getItem('tokenAlkemy');
      if (token || this.api.estadoSesion) {
        return true;
      }
  
      this.router.navigate(['login']);
      return false;

  }
  
}
