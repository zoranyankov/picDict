import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { StateService } from '../core/state.service';
import { IRegResponse } from '../shared/interfaces/register-response-interface';
import { HelpService } from '../shared/services/help.service';
import { User } from './userModels/user.model';

@Injectable()
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);
  constructor(
    private _config: ConfigService,
    private _http: HttpClient,
    private _errorService: HelpService,
    private _router: Router,
    private _stateService: StateService
  ) { }

  register(username: string, password: string) {
    // console.log('in client register');
    return this._http.post<IRegResponse>(this._config.SERVER_AUTH_URL('register'), { username: username, password: password })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          console.log(res);
          this.authenticateUser(res.user._id, res.user.username, res.token);
          this._router.navigateByUrl('');
        })
      )
  }

  // verify(verifyData: { username: string, token: string }) {
  //   // console.log('in client verify');
  //   return this._http.post<IRegResponse>(this._config.SERVER_AUTH_URL('verify'), verifyData)
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         return this._errorService.handleError(err);
  //       }),
  //       tap(res => {
  //         // if (!res || !res.result) {
  //         if (!res) {
  //           localStorage.removeItem('sid');
  //           console.log('appErr');
  //           return false;
  //         }
  //         console.log(res);
  //         return true;
  //       })
  //     )
  // }

  login(username: string, password: string) {
    return this._http.post<IRegResponse>(this._config.SERVER_AUTH_URL('login'), { username, password })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          console.log(res);
          console.log(res.user);

          this.authenticateUser(res.user._id, res.user.username, res.token);
          this._router.navigateByUrl('');
        })
      )
  }

  getLoggedUserName() {
    let cookie = localStorage.getItem('sid');
    let { user } = cookie ? JSON.parse(cookie) : { user: '' };
    console.log(user);
    // console.log(cookie);
    return user;
  }

  getLoggedUserId(): string {
    let storage = localStorage.getItem('sid');
    let currentStorage = storage ? JSON.parse(storage) : null;
    let { _userId } = currentStorage || { _userId: null };
    // console.log(_token);
    return _userId;
  }
  
  getLoggedUserToken = () => {
    let storage = localStorage.getItem('sid');
    let currentStorage = storage ? JSON.parse(storage) : null;
    let { _token } = currentStorage || { _token: null };
    return _token;
  }

  private authenticateUser(userId: string, user: string, token: string) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const newUser = new User(userId, user, token)
    // console.log(newUser);
    this.currentUser.next(newUser);
    localStorage.setItem('sid', JSON.stringify(newUser));
    this._stateService.setState({isAuthName: user, isLogged: true, isAuthorized: true});
  }
}
