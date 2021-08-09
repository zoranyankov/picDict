import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
// import { IsLogged } from './core/guards/is.logged';
import { HomeComponent } from './home/home.component';
// import { PicwordListComponent } from './picwords/picword-list/picword-list.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path:'about',
    component: AboutComponent,
  },
  {
    path:'**',
    component: ErrorComponent,
  },
  // {
  //   path:'pw',
  //   canActivate: [
  //     IsLogged
  //   ],
  //   data: {
  //     paramsActivateRedirectUrl: '/'
  //   },
  //   component: PicwordListComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
