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

  findById(id: any): Observable<Tecnico> {//Método responsável por fazer requisição do tipo get buscando por um técnico específico
    return this.http.get<Tecnico>(`${API_CONFIG.baseURL}/tecnicos/${id}`);
  }

  findAll(): Observable<Tecnico[]> { //Método responsável por fazer a requisição e retornar os técnicos, e irá retornar um observable de uma lista de tecnicos
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseURL}/tecnicos`);//requisição do tipo get na rota tecnicos
  }

  create(tecnico: Tecnico): Observable<Tecnico> { //Método responsável por criar um tecnico, irá receber um tecnico como parâmetro e irá retornar um observable de técnico para que seja feita a requisição e seja observada a resposta
    return this.http.post<Tecnico>(`${API_CONFIG.baseURL}/tecnicos`, tecnico);//requisição do tipo post na rota tecnicos
  }

  update(tecnico: Tecnico): Observable<Tecnico> {//Método responsável por atualizar o técnico
    return this.http.put<Tecnico>(`${API_CONFIG.baseURL}/tecnicos/${tecnico.id}`, tecnico);
  }
}
