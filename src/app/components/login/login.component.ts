import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  //Validação de usuário e senha por controle de formulário
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService, //Instância de ToastrService
    private service: AuthService, //Instância da classe AuthService
    private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => { //Chamada do método authenticate da classe AuthService que irá recuperar o usuário e senha informados pelo usuário e irá retornar se a resposta contém ou não informação
      this.service.successfullLogin(resposta.headers.get('Authorization').substring(7)); //Se a resposta contiver um conteúdo, será enviado o header da resposta para o método successfullLogin da classe AuthService
      this.router.navigate(['']);//Se a resposta contiver um conteúdo, após autenticar o usuário será redirecionado para a rota ''
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos!') //Se a resposta retornar vazia será exibido o toast
    } )
  }

  validaCampos(): boolean { //Verifica se o usuário e senha são válidos baseados na validação do FormControl
   return this.email.valid && this.senha.valid;
  }

}
