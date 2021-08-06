import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificateComponent } from './notificate/notificate.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    NotificateComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificateComponent
  ]
})
export class SharedModule { }
