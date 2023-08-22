import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.router.navigate(['tecnicos/delete/1'])//Quando projeto for iniciado, irá navegar para a rota home
  }

  Logout() { //Quando usuário selecionar a opção Logout no menu
    this.router.navigate(['login']);//Será redirecionado para a rota login
    this.authService.Logout();//Será executado o método logout da classe AuthService
    this.toast.info('Logout realizado com sucesso!', 'Logout', {timeOut: 2000});//Será exibido um toast informando que o usuário fez logout
  }

}
