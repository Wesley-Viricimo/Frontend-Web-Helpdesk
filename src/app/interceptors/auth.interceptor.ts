import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { //Método que será responsável por interceptar a requisição
    let token = localStorage.getItem('token'); //recuperando o token do localStorage do navegador

    if(token){ //Se o token existir
      const cloneReq = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});//Clonar a requisição adicionando o token no header da requisição
      return next.handle(cloneReq);
    } else { //Se o token não existir
    return next.handle(request); //Irá prosseguir com a requisição, sem o token
    }
  }
}

export const AuthInterceptorProvider = [ //Exportando a interceptação criada
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
