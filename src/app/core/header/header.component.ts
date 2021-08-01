import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLogged: Boolean = false;
  constructor(private _state: StateService) { }

  ngOnInit(): void {
    this.isLogged = this._state.isLogged;
    this._state.isLoggedUpdated.subscribe((isLogged) =>{
      console.log('Logged Change');
      
      this.isLogged = isLogged;
    })
  }
  ngOnDestroy() {
    this._state.isLoggedUpdated.unsubscribe();
  }
}
