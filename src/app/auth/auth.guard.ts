import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authenticated = this.authService.isAuthenticated(); //Variável armazena se o usuário está autenticado ou não

    if(authenticated) { //Se estiver autenticado retornará verdadeiro e se não estiver autenticado será redirecionado para a tela de login e retornará falso;
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
