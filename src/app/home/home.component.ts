import { Component, OnInit } from '@angular/core';
import { StateService } from '../core/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged: Boolean = false;
  constructor(private _state: StateService) { }

  ngOnInit(): void {
    this.isLogged = this._state.isLogged;
  }

}
