import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes']; //Array com os nomes das colunas da tabela do html
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.findAll(); //Método findAll será chamado sempre que o componente clientes for iniciado
  }

  findAll() { //Método responsável por fazer a chamada do método findAll da classe service
    this.service.findAll().subscribe(resposta => { //Quando o método receber a resposta da requisição, irá chamar a função
      this.ELEMENT_DATA = resposta //Recebendo o array de clientes do backend no array de clientes criado no frontend
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator; //Controla a paginação da listagem
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}

