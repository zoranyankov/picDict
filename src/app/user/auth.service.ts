import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { ErrorService } from './error.service';
import { IAuthResponse } from './userInterfaces/auth-response.interface';
import { User } from './userModels/user.model';

@Injectable()
export class AuthService {

  currentUser = new BehaviorSubject<User|null>(null);
  constructor(private config: ConfigService, private http:HttpClient, private _errorService: ErrorService) { }

  register(username: string,password: string) {
    return this.http.post<IAuthResponse>(this.config.SERVER_AUTH_URL, {username, password})
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          this.authenticateUser(res.user, res.token)
        })
      )
  }

  login(username: string,password: string) {
    return this.http.post<IAuthResponse>(this.config.SERVER_AUTH_URL,{ username, password})
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        }),
        tap(res => {
          this.authenticateUser(res.user, res.token)
        })
      )
  }
  private authenticateUser(user: string, token: string){
    // const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const newUser = new User(user, token)
    console.log(newUser);
    this.currentUser.next(newUser);
    localStorage.setItem('sid', JSON.stringify(newUser))
  }
}
