import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificateComponent } from './notificate/notificate.component';



@NgModule({
  declarations: [
    NotificateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificateComponent
  ]
})
export class SharedModule { }
