import { Component, Input } from '@angular/core';
import { INotificate } from '../interfaces/notificate-interface';

@Component({
  selector: 'app-notificate',
  templateUrl: './notificate.component.html',
  styleUrls: ['./notificate.component.css']
})
export class NotificateComponent{
  @Input() notificate: INotificate = {type: 'error', messages: []};

  constructor() {
  }
 
}