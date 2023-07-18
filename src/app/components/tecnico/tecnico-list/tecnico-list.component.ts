import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes']; //Array com os nomes das colunas da tabela do html
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.findAll(); //Método findAll será chamado sempre que o componente tecnicos for iniciado
  }

  findAll() { //Método responsável por fazer a chamada do método findAll da classe service
    this.service.findAll().subscribe(resposta => { //Quando o método receber a resposta da requisição, irá chamar a função
      this.ELEMENT_DATA = resposta //Recebendo o array de tecnicos do backend no array de tecnicos criado no frontend
      this.dataSource = new MatTableDataSource<Tecnico>(resposta);
      this.dataSource.paginator = this.paginator; //Controla a paginação da listagem
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}

