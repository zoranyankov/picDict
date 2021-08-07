import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { IsLogged } from './guards/is.logged';
import { NotLogged } from './guards/not.logged';
import { Logout } from './guards/logout';
import { StateService } from './state.service';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers:[
    StateService,
    IsLogged,
    NotLogged,
    Logout
  ]
})
export class CoreModule { }
