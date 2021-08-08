import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { HelpService } from '../shared/services/help.service';
import { PicwordsModule } from '../picwords/picwords.module';
import { PassMatchDirective } from './pass-match.directive';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PassMatchDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
    PicwordsModule
  ],
  providers: [
    AuthService,
    HelpService
  ]
})
export class UserModule { }
