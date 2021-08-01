import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogged } from '../core/guards/is.logged';
import { Logout } from '../core/guards/logout';
import { NotLogged } from '../core/guards/not.logged';
import { HomeComponent } from '../home/home.component';
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
    canActivate: [
      NotLogged
    ],
    data: {
      paramsActivateRedirectUrl: '/'
    }
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [
      NotLogged
    ],
    data: {
      paramsActivateRedirectUrl: '/'
    }
  },
  {
    path: 'auth/logout',
    component: HomeComponent,
    canActivate: [
      Logout
    ],
    data: {
      paramsActivateRedirectUrl: '/'
    }
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
