import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config';
import { IPWCreate } from '../shared/interfaces/pwCreate-interface';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  pexelWord: IPWCreate = { word: '', pictureUrl: '' };
  constructor(private _http: HttpClient, private _config: ConfigService) { }

  search(word: string) {
    return this._http.get(this._config.PEXELS_API_URL(word), { headers: { 'Authorization': this._config.PEXELS_API_TOKEN } });
  }

  setPexelW(pexelWord: IPWCreate): void {
    this.pexelWord = pexelWord;
  }
  getPexelW(): IPWCreate {
    return this.pexelWord;
  }
}
