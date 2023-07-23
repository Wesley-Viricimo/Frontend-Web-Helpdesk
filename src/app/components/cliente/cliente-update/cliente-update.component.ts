import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = { //Inicializando objeto técnico
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

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

  update(): void {
    this.service.update(this.cliente).subscribe(() => { //Irá ser feita a chamada do método update da classe clienteService
      this.toast.success('Cliente atualizado com sucesso', 'Atualização');//Se for realizada a atualização do técnico com sucesso irá ser exibida a mensagem
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

  addPerfil(perfil: any): void { //Método responsável por adicionar perfis
    if(this.cliente.perfis.includes(perfil)) { //Se a lista de perfil já contiver o perfil que foi selecionado
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1); //Irá remover o perfil buscando pelo perfil que foi informado e remover apenas o primeiro caso que encontrar
    } else {
      this.cliente.perfis.push(perfil); //Se perfil ainda não existir significa que ainda não existe na lista
    }
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

}