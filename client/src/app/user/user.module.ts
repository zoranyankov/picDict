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
import { ProfileResultsComponent } from './profile/profile-results/profile-results.component';
import { ProfilePicwordsComponent } from './profile/profile-picwords/profile-picwords.component';
import { TableComponent } from './profile/table/table.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PassMatchDirective,
    ProfileResultsComponent,
    ProfilePicwordsComponent,
    TableComponent
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
