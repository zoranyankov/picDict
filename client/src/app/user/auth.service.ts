import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { StateService } from '../core/state.service';
import { INewUser } from '../shared/interfaces/new-user-interface';
import { IRegResponse } from '../shared/interfaces/register-response-interface';
import { HelpService } from '../shared/services/help.service';

@Injectable()
export class AuthService {

  private currentUser = new BehaviorSubject<INewUser | null>(null);
  currentUser$ = this.currentUser.asObservable();

  isLoggedIn$: Observable<boolean>;
  isNotLoggedIn$: Observable<boolean>;


  constructor(
    private _config: ConfigService,
    private _http: HttpClient,
    private _errorService: HelpService,
    private _router: Router,
    private _stateService: StateService
  ) {
    this.isLoggedIn$ = this.currentUser$.pipe(map(user => {
      console.log(user);
      console.log(!!user);
      return !!user;
    }));
    this.isNotLoggedIn$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
   }

  register(username: string, password: string) {
    // console.log('in client register');
    return this._http.post<INewUser>(this._config.SERVER_AUTH_URL('register'), { username: username, password: password })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          console.log(res);
          this.authenticateUser(res);
          this._router.navigateByUrl('');
        })
      )
  }

  verify(user: INewUser) {
    let verifyData = { username: user.username, token: user.token }
    console.log(verifyData);
    
    // console.log('in client verify');
    return this._http.post<any>(this._config.SERVER_AUTH_URL('verify'), verifyData)
      .pipe(
        catchError(err => {
          console.log(err);
          this.currentUser.next(null);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          this.currentUser.next(user);
        })
      )
  }

  login(username: string, password: string) {
    return this._http.post<IRegResponse>(this._config.SERVER_AUTH_URL('login'), { username, password })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          console.log(res);
          let user:INewUser = {_id: res.user._id, username: res.user.username, picture: res.user.picture, token: res.token}
          this.authenticateUser(user);
          this._router.navigateByUrl('');
        })
      )
  }

  getLoggedUserName() {
    let cookie = localStorage.getItem('sid');
    let { username } = cookie ? JSON.parse(cookie) : { username: '' };
    console.log(username);
    // console.log(cookie);
    return username;
  }

  getLoggedUserId(): string {
    let storage = localStorage.getItem('sid');
    let currentStorage = storage ? JSON.parse(storage) : null;
    let { _id } = currentStorage || { _id: null };
    // console.log(_token);
    return _id;
  }
  
  getLoggedUser = () => {
    let storage = localStorage.getItem('sid');
    try {
      let {username, token } = storage && JSON.parse(storage) ? JSON.parse(storage) : { username: '', token: '' };
      if (!storage || !username || !token) {
        // this._auth.authenticateUser(null);
        throw new Error('Invalid Token');
      }
    } catch (error) {
      localStorage.removeItem('sid');
      this.authenticateUser(null);
      return false;
    }
    let currentStorage = storage ? JSON.parse(storage) : null;
    let {username, token } = currentStorage || {username: '', token: null };
    return {username, token};
  }
  getLoggedUserToken = () => {
    let storage = localStorage.getItem('sid');
    try {
      let { token } = storage && JSON.parse(storage) ? JSON.parse(storage) : { token: '' };
      if (!storage || !token) {
        // this._auth.authenticateUser(null);
        throw new Error('Invalid Token');
      }
    } catch (error) {
      localStorage.removeItem('sid');
      this.authenticateUser(null);
      return false;
    }
    let currentStorage = storage ? JSON.parse(storage) : null;
    let { token } = currentStorage || { token: null };
    return token;
  }

  public authenticateUser(user: INewUser | null) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    this.currentUser.next(user);
    if(user) {localStorage.setItem('sid', JSON.stringify(user));}
    this._stateService.setState({isAuthName: user?.username || '', isLogged: true, isAuthorized: true});
  }
}
