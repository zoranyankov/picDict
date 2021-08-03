import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { IPW } from '../shared/interfaces/picword-interface';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  pexelWord : IPW = {word: '', pictureUrl: ''};
  constructor(private _http: HttpClient, private _config: ConfigService) { }

  search(word: string) {
    return this._http.get(this._config.PEXELS_API_URL(word), { headers: { 'Authorization': this._config.PEXELS_API_TOKEN } });
  }

  setPexelW(pexelWord: IPW) :void {
    this.pexelWord = pexelWord;
  }
  getPexelW() :IPW {
    return this.pexelWord;
  }
}
