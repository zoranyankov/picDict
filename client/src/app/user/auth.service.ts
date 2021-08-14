import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { login } from '../+state/authActions';
import { initialState } from '../+state/authReducers';
import { ConfigService } from '../config/config';
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
    private _store: Store
  ) {
    this.isLoggedIn$ = this.currentUser$.pipe(map(user => {
      return !!user;
    }));
    this.isNotLoggedIn$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
   }

  register(username: string, password: string) {
    return this._http.post<IRegResponse>(this._config.SERVER_AUTH_URL('register'), { username, password })
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

  verify(user: INewUser) {
    let verifyData = { username: user.username, token: user.token }
    return this._http.post<any>(this._config.SERVER_AUTH_URL('verify'), verifyData)
      .pipe(
        catchError(err => {
          console.log(err);
          localStorage.removeItem('sid');
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
          let user:INewUser = {_id: res.user._id, username: res.user.username, picture: res.user.picture, token: res.token}
          this.authenticateUser(user);
          this._router.navigateByUrl('');
        })
      )
  }

  getLoggedUserName() {
    let cookie = localStorage.getItem('sid');
    let { username } = cookie ? JSON.parse(cookie) : { username: '' };
    return username;
  }

  getLoggedUserId(): string {
    let storage = localStorage.getItem('sid');
    let currentStorage = storage ? JSON.parse(storage) : null;
    let { _id } = currentStorage || { _id: null };
    return _id;
  }
  
  getLoggedUser = () => {
    let storage = localStorage.getItem('sid');
    try {
      let {username, token } = storage && JSON.parse(storage) ? JSON.parse(storage) : { username: '', token: '' };
      if (!storage || !username || !token) {
        this.authenticateUser(null);
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
        console.log('InvalidToken');
        
        this.authenticateUser(null);
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
    console.log(user);
    // const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    this._store.dispatch(login(user ? {user} : { user: initialState}))
    this.currentUser.next(user);
    if(user) {localStorage.setItem('sid', JSON.stringify(user));}
    // this._stateService.setState({isAuthName: user?.username || '', isLogged: true, isAuthorized: true});
  }
}
