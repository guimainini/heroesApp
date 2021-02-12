import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registry',
        component: RegistryComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }

    ]
  }
]



@NgModule({
  
  imports: [
    RouterModule.forChild( routes )  
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule { }
