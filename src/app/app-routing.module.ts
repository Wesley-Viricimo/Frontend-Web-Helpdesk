import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children:[//Quando o path for vazio será renderizado na tela o componente NavComponent
      {path: 'home', component: HomeComponent},//Quando a rota for home será renderizada a tela home
      {path: 'tecnicos', component: TecnicoListComponent},//Quando a rota for tecnicos será renderizada a tela tecnicos
      {path: 'tecnicos/create', component: TecnicoCreateComponent},
      {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
