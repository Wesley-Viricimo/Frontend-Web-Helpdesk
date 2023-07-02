import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [
   {
    id: 1,
    nome: "Wesley Viricimo",
    cpf: "123.456.789-10",
    email: "wesley.viricimo.silva@outlook.com",
    senha: "12345",
    perfis: ["0"],
    dataCriacao: '15/02/2022'
   },
   {
    id: 2,
    nome: "Jessica Jullie",
    cpf: "123.456.789-10",
    email: "carvalho.juh@gmail.com",
    senha: "12345",
    perfis: ["0"],
    dataCriacao: '01/07/2022'
   },
   {
    id: 3,
    nome: "Ana Julia",
    cpf: "123.456.789-10",
    email: "julia.carvalhoy3@gmail.com",
    senha: "12345",
    perfis: ["0"],
    dataCriacao: '01/07/2023'
   }
  ]

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes']; //Array com os nomes das colunas da tabela do html
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}

