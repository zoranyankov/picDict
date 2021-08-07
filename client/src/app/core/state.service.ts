import { Injectable, OnInit } from '@angular/core';
import { IState } from '../shared/interfaces/state-interface';

@Injectable()
export class StateService implements OnInit {

  private _state: IState

  constructor() {
    this._state = {
      isAuthName: '',
      isLogged: false,
      isAuthorized: false
    }
  }

  setState(state: IState) {
    this._state = { ...this._state, ...state };
  }

  getState() {
    return this._state;
  }

  ngOnInit() {
    let storage = localStorage.getItem('sid');
    let currentStorage = storage ? JSON.parse(storage) : null;
    this.setState(currentStorage);
  }
  // ngDoCheck() {
  //   let storage = localStorage.getItem('sid');
  //   let currentStorage = storage ? JSON.parse(storage) : null;
  //   this.setState(currentStorage);
  // }
}
