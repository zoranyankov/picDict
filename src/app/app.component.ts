import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StateService } from './core/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'picDict';
  isLogged: Boolean = false
  constructor(private _state:StateService) {}
  ngOnInit() {
    this._state.isLoggedUpdated.subscribe((isLogged) =>{
      console.log('Logged Change');
      
      this.isLogged = isLogged;
    })
  }
  ngOnDestroy() {
    this._state.isLoggedUpdated.unsubscribe();
  }
}
