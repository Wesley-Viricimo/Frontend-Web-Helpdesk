import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, children:[//Quando o path for vazio será renderizado na tela o componente NavComponent
      {path: 'home', component: HomeComponent},//Quando a rota for home será renderizada a tela home
      {path: 'tecnicos', component: TecnicoListComponent}//Quando a rota for tecnicos será renderizada a tela tecnicos
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
