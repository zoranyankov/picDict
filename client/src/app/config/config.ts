import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigService {

  // SERVER_AUTH_URL: string = `${environment.serverUrl}auth`;
  API_PICWORD_URL: string = `${environment.serverUrl}api/picWords`;
  API_RESULT_URL: string = `${environment.serverUrl}api/results`;
  PEXELS_API_TOKEN: string = '563492ad6f9170000100000111bc7c61400e40be8ab6ea1b36b9afe1';
  
  // Pexel Endpoints
  PEXELS_API_URL = (wrd : string) => `https://api.pexels.com/v1/search?query=${wrd}`;

  //Authentication Endpoints
  SERVER_AUTH_URL(path: string): string {
    return `${environment.serverUrl}auth/${path}`;
  }
    constructor() { }
}
