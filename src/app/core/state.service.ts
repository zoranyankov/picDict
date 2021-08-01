import { Injectable } from '@angular/core';
import { IState } from '../shared/interfaces/state-interface';

@Injectable()
export class StateService {
  state: IState = {username: '', isLogged: false, isAuthorized: false}
  constructor() { }
  private _setState(newState: IState){
    this.state = newState;
  }

  get isLogged() {
    return this.state.isLogged
  }

  get username() {
    return this.state.username
  }

  set setLoggedState(newState: Boolean) {
    this.state.isLogged = newState;
  }
}
