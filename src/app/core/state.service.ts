import { EventEmitter, Injectable } from '@angular/core';
import { IState } from '../shared/interfaces/state-interface';

@Injectable()
export class StateService {
  state: IState = { username: '', isLogged: false, isAuthorized: false }
  isLoggedUpdated : EventEmitter<any> = new EventEmitter();
  constructor() { }
  private _setState(newState: IState) {
    this.state = newState;
  }

  get isLogged() {
    return this.state.isLogged
  }

  get username() {
    return this.state.username
  }

  changeLoggedState(newState: Boolean) {
    this.state.isLogged = newState;
    this.isLoggedUpdated.emit(this.state.isLogged)
  }
}
