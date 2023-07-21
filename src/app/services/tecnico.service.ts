import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Tecnico } from '../models/tecnico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { //htttclient é necessário para realizar requisições http

  } 

  findAll(): Observable<Tecnico[]> { //Método responsável por fazer a requisição e retornar os técnicos, e irá retornar um observable de uma lista de tecnicos
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseURL}/tecnicos`);
  }

  create(tecnico: Tecnico): Observable<Tecnico> { //Método responsável por criar um tecnico, irá receber um tecnico como parâmetro e irá retornar um observable de técnico para que seja feita a requisição e seja observada a resposta
    return this.http.post<Tecnico>(`${API_CONFIG.baseURL}/tecnicos`, tecnico);
  }
}
