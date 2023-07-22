import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    private router: Router, //Instância do router
    private route: ActivatedRoute) { } //Instância de activatedRoute 

  ngOnInit(): void { 
    this.tecnico.id = this.route.snapshot.paramMap.get('id'); //Recuperar o id através da rota do navegador
    this.findById(); //Sempre que a classe for iniciada irá ser feita uma requisição buscando por id
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => { //Realizando chamada do método de requisição por id e quando for recebida a resposta
      resposta.perfis = []; //Limpar os perfis
      this.tecnico = resposta; //Receber a resposta no objeto tecnico
    })
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(() => { //Irá ser feita a chamada do método update da classe tecnicoService
      this.toast.success('Tecnico atualizado com sucesso', 'Atualização');//Se for realizada a atualização do técnico com sucesso irá ser exibida a mensagem
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