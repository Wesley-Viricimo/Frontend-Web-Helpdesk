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
}
