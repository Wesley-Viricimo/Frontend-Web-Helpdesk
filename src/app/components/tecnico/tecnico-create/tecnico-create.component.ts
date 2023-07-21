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

  tecnico: Tecnico ={
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
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.tecnico).subscribe(() => {
      this.toast.success('Tecnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos']);
    }, exception => {
      if(exception.error.errors) {
        exception.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(exception.error.message);
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
