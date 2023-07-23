import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes']; //Array com os nomes das colunas da tabela do html
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void { //Quando a classe for acessada
    this.findAll(); //Sera feita uma chamado no método findAll
  }

  findAll():void {
    this.service.findAll().subscribe(resposta => { //Faz a chamada do método findAll da classe chamadoService e espera a resposta,e quando a resposta chega
      this.ELEMENT_DATA = resposta; //Passa a resposta para o element_data
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  getStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO';
    } else if (status == '1') {
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  getPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA';
    } else if (prioridade == '1') {
      return 'MEDIA';
    } else {
      return 'ALTA';
    }
  }

  orderByStatus(status: any) : void { //Método responsável por listar os chamados por ordem de prioridade
    let list: Chamado[]= []
    this.ELEMENT_DATA.forEach(element => {//Pegar todos os itens do ELEMENT_DATA onde estão os dados recebidos da API
      if(element.status == status) { //Se o status do chamado do ELEMENT_DATA for igual o status recebido por parâmetro
        list.push(element);//Adicionar no array de chamados
      }
    })
    this.FILTERED_DATA = list; //Adicionar lista filtrada no FILTERED_DATA
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
