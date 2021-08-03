import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { IPW } from '../shared/interfaces/picword-interface';
import { ErrorService } from '../shared/services/error.service';

@Injectable()
export class PicwordsService {

  constructor(private _http: HttpClient, private _config: ConfigService, private _errorService: ErrorService) { }

  createPW(pw: IPW) {
    const token = this._config.getToken();
    return this._http.post(`${this._config.API_PICWORD_URL}/create`, pw, { headers: { 'x-access-token': token } })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        })
      )
  }

  getAll() {
    const token = this._config.getToken();
    return this._http.get(`${this._config.API_PICWORD_URL}/`, { headers: { 'x-access-token': token } })
      .pipe(
        catchError(err => {
          console.log(err);
          return this._errorService.handleError(err);
        })
      )
  }

}
