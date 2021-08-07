import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { IsLogged } from '../core/guards/is.logged';
import { CreatePicwordComponent } from './create-picword/create-picword.component';
import { EditPicwordComponent } from './edit-picword/edit-picword.component';
import { FindPicwordComponent } from './find-picword/find-picword.component';
import { PicwordDetailsComponent } from './picword-details/picword-details.component';
import { PicwordListComponent } from './picword-list/picword-list.component';

const routes: Routes = [
  // {
  //   path:'pw',
  //   component: AboutComponent,
  //   canActivate: [
  //     IsLogged
  //   ],
  //   data: {
  //     paramsActivateRedirectUrl: '/'
  //   },
  // },
  {
    path:'pw/picwords',
    component: PicwordListComponent,
      canActivate: [
        IsLogged
      ],
      data: {
        paramsActivateRedirectUrl: '/'
      },
    },
  {
    path:'pw/user-pwList',
    component: PicwordListComponent,
      canActivate: [
        IsLogged
      ],
      data: {
        paramsActivateRedirectUrl: '/',
        userPwList: true
      },
    },
    {
      path:'pw/create-picword',
      component: CreatePicwordComponent,
      canActivate: [
        IsLogged
      ],
      data: {
        paramsActivateRedirectUrl: '/'
      },
    },
    {
      path:'pw/find-picword',
      component: FindPicwordComponent,
      canActivate: [
        IsLogged
      ],
      data: {
        paramsActivateRedirectUrl: '/'
      },
    },
    {
      path:'pw/edit-picword',
      component: EditPicwordComponent,
      canActivate: [
        IsLogged
      ],
      data: {
        paramsActivateRedirectUrl: '/'
      },
    },
    {
      path:'pw/picword-details',
      component: PicwordDetailsComponent,
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
