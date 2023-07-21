import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = { //Inicializando objeto técnico
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
    private service: TecnicoService,//Instância de tecnico service para realizar a requisição
    private toast: ToastrService, //Instância do toast
    private router: Router) { } //Instância do router

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.tecnico).subscribe(() => { //Irá ser feita a chamada do método create da classe tecnicoService
      this.toast.success('Tecnico cadastrado com sucesso', 'Cadastro');//Se for realizada a criação do técnico com sucesso irá ser exibida a mensagem
      this.router.navigate(['tecnicos']); //E redirecionar para a rota tecnicos
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
    if(this.tecnico.perfis.includes(perfil)) { //Se a lista de perfil já contiver o perfil que foi selecionado
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1); //Irá remover o perfil buscando pelo perfil que foi informado e remover apenas o primeiro caso que encontrar
    } else {
      this.tecnico.perfis.push(perfil); //Se perfil ainda não existir significa que ainda não existe na lista
    }
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

}
