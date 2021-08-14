import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../config/config';
import { IPWCreate } from '../shared/interfaces/pwCreate-interface';
import { IResult } from '../shared/interfaces/result-interface';
import { IResultRes } from '../shared/interfaces/result-response-interface';
import { IResults } from '../shared/interfaces/results-interface';
import { HelpService } from '../shared/services/help.service';
import { AuthService } from '../user/auth.service';

@Injectable()
export class ResultService {

  constructor(
    private _http: HttpClient,
    private _config: ConfigService,
    private _auth: AuthService,
    private _errorService: HelpService
  ) { }

  add(data: IResult) {
    const token = this._auth.getLoggedUserToken();
    return this._http.post(`${this._config.API_RESULT_URL}/add`, data, { headers: { 'x-access-token': token } })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        })
      )
  }

  // getAll() {
  //   const token = this._auth.getLoggedUserToken();
  //   return this._http.get(`${this._config.API_RESULT_URL}/`, { headers: { 'x-access-token': token } })
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         return this._errorService.handleError(err);
  //       })
  //     )
  // }

  getByUserId(userId: string) : any {
    const token = this._auth.getLoggedUserToken();
    return this._http.get(`${this._config.API_RESULT_URL}/${userId}`, { headers: { 'x-access-token': token } })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        })
      )
  }

  // getOne(pwId: string) {
  //   const token = this._auth.getLoggedUserToken();
  //   return this._http.get(`${this._config.API_RESULT_URL}/${pwId}`, { headers: { 'x-access-token': token } })
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         return this._errorService.handleError(err);
  //       })
  //     )
  // }

  // deleteOne(pwId: string) {
  //   const token = this._auth.getLoggedUserToken();
  //   return this._http.delete(`${this._config.API_RESULT_URL}/delete/${pwId}`, { headers: { 'x-access-token': token } })
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         return this._errorService.handleError(err);
  //       })
  //     )
  // }

  // editOne(pwId: string, pw: IPWCreate) {
  //   const token = this._auth.getLoggedUserToken();
  //   return this._http.patch(`${this._config.API_RESULT_URL}/edit/${pwId}`, pw, { headers: { 'x-access-token': token } })
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         return this._errorService.handleError(err);
  //       })
  //     )
  // }

}
