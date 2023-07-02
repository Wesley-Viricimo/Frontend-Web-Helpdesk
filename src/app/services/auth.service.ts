import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { } //Toda vez que o service for construido irá ser criada uma instância de HttpClient

  authenticate(creds: Credenciais) { //Metodo irá receber as informações digitadas pelo usuário nos campos email e senha
    return this.http.post(`${API_CONFIG.baseURL}/login`, creds, {//Irá ser feito uma requisição do tipo post nesta url com as credenciais informadas pelo usuário
      observe: 'response',
      responseType: 'text'
    })
  }

  successfullLogin(authToken: string) { //Se a requisição for realizada com sucesso o token será setado no localStorage do navegador
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() { //Se usuário estiver autenticado será recuperado o token de autenticação do localStorage e se o token não tiver expirado retornará verdadeiro, senão retornará falso
    let token = localStorage.getItem('token');
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  Logout() { //Quando o método for executado
    localStorage.clear(); //Será limpo o token de acesso
  }
}
