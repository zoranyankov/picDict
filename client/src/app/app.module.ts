import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PicwordsModule } from './picwords/picwords.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { ConfigService } from './config/config';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './+state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    PicwordsModule,
    UserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ }),
    BrowserAnimationsModule
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
