import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { StateService } from '../core/state.service';
import { IRegResponse } from '../shared/interfaces/register-response-interface';
import { ErrorService } from './error.service';
import { User } from './userModels/user.model';

@Injectable()
export class AuthService {

  currentUser = new BehaviorSubject<User | null>(null);
  constructor(
    private _config: ConfigService,
    private _http: HttpClient,
    private _errorService: ErrorService,
    private _state: StateService,
    private _router: Router,
    ) { }

  register(username: string, password: string) {
    console.log('in cliet register');
    return this._http.post<IRegResponse>(this._config.SERVER_AUTH_URL('register'), { username: username, password: password })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          console.log(res);
          this.authenticateUser(res.user.username, res.token);
          this._state.changeLoggedState(true);
          this._router.navigateByUrl('');
        })
      )
  }

  login(username: String, password: String) {
    return this._http.post<IRegResponse>(this._config.SERVER_AUTH_URL('login'), { username, password })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          this.authenticateUser(res.user.username, res.token);
          this._state.changeLoggedState(true);
          this._router.navigateByUrl('');
        })
      )
  }
  private authenticateUser(user: String, token: String) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const newUser = new User(user, token)
    console.log(newUser);
    this.currentUser.next(newUser);
    localStorage.setItem('sid', JSON.stringify(newUser))
  }
}
