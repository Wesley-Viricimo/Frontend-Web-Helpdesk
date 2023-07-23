import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

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
    private router: Router) { } //Instância do router

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.cliente).subscribe(() => { //Irá ser feita a chamada do método create da classe clienteService
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');//Se for realizada a criação do técnico com sucesso irá ser exibida a mensagem
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
