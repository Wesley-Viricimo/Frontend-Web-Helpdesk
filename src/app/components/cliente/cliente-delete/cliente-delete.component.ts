import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  
  cliente: Cliente = { //Inicializando objeto cliente
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: ClienteService,//Instância de cliente service para realizar a requisição
    private toast: ToastrService, //Instância do toast
    private router: Router, //Instância do router
    private route: ActivatedRoute) { } //Instância de activatedRoute 

  ngOnInit(): void { 
    this.cliente.id = this.route.snapshot.paramMap.get('id'); //Recuperar o id através da rota do navegador
    this.findById(); //Sempre que a classe for iniciada irá ser feita uma requisição buscando por id
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => { //Realizando chamada do método de requisição por id e quando for recebida a resposta
      resposta.perfis = []; //Limpar os perfis
      this.cliente = resposta; //Receber a resposta no objeto cliente
    })
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(() => { //Irá ser feita a chamada do método update da classe clienteService
      this.toast.success('Cliente excluído com sucesso', 'Exclusão');//Se for realizada a atualização do cliente com sucesso irá ser exibida a mensagem
      this.router.navigate(['clientes']); //E redirecionar para a rota clientes
    }, exception => { //Se der algum erro
      if(exception.error.errors) {//Se o erro for um array com vários erros
        exception.error.errors.forEach(element => { //Percorrer o array
          this.toast.error(element.message);//E exibir um toast para cada um deles
        });
      } else { //Se for apenas um erro
        this.toast.error(exception.error.message);//Exibir um toast com o erro
      }
    })
  }

}