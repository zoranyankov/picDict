import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { IsLogged } from './core/guards/is.logged';
import { HomeComponent } from './home/home.component';
import { PicwordListComponent } from './picwords/picword-list/picword-list.component';

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
