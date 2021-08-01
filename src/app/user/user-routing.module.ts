import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogged } from '../core/guards/is.logged';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'auth/logout',
    redirectTo: '/',
  },
  {
    path: 'auth/profile',
    component: ProfileComponent,
    canActivate: [
      IsLogged
    ],
    data: {
      paramsActivateRedirectUrl: '/'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
