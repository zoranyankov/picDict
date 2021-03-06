import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogged } from '../core/guards/auth.guard';
// import { IsLogged } from '../core/guards/is.logged';
import { CreatePicwordComponent } from './create-picword/create-picword.component';
import { FindPicwordComponent } from './find-picword/find-picword.component';
import { PicwordDetailsComponent } from './picword-details/picword-details.component';
import { PicwordListComponent } from './picword-list/picword-list.component';
import { PicwordTestComponent } from './picword-test/picword-test.component';

const routes: Routes = [
  {
    path: 'pw',
    redirectTo:'pw/picwords',
    pathMatch: 'full',
  },
  {
    path: 'pw/picwords',
    component: PicwordListComponent,
    canActivate: [
      IsLogged
    ],
    data: {
      paramsActivateRedirectUrl: 'auth/login'
    },
  },
  // {
  //   path: 'pw/user-pwList/:userId',
  //   component: PicwordListComponent,
  //   canActivate: [
  //     IsLogged
  //   ],
  //   data: {
  //     paramsActivateRedirectUrl: 'auth/login',
  //     flag: 'profile'
  //   },
  // },
  {
    path: 'pw/create-picword',
    component: CreatePicwordComponent,
    canActivate: [
      IsLogged
    ],
    data: {
      paramsActivateRedirectUrl: 'auth/login'
    },
  },
  {
    path: 'pw/find-picword',
    component: FindPicwordComponent,
    canActivate: [
      IsLogged
    ],
    data: {
      paramsActivateRedirectUrl: '/',
      flag: 'find'
    },
  },
  {
    path: 'picword-test',
    component: PicwordTestComponent,
    canActivate: [
      IsLogged
    ],
    data: {
      paramsActivateRedirectUrl: '/'
    },
  },
  {
    path: 'pw/picword-details/:pwId',
    component: PicwordDetailsComponent,
    pathMatch: 'full',
    canActivate: [
      IsLogged
    ],
    data: {
      paramsActivateRedirectUrl: '/'
    },
  },
  {
    path: 'pw/picword/:pwId/:action',
    component: CreatePicwordComponent,
    canActivate: [
      IsLogged
    ],
    data: {
      paramsActivateRedirectUrl: '/'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicwordsRoutingModule { }
