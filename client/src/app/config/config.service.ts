import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../user/auth.service';

@Injectable()
export class ConfigService {

  // SERVER_AUTH_URL: string = `${environment.serverUrl}auth`;
  API_PICWORD_URL: string = `${environment.serverUrl}api/picWords`;
  API_RESULT_URL: string = `${environment.serverUrl}api/results`;
  PEXELS_API_TOKEN: string = '563492ad6f9170000100000111bc7c61400e40be8ab6ea1b36b9afe1';
  
  PEXELS_API_URL = (wrd : string) => `https://api.pexels.com/v1/search?query=${wrd}`;

  SERVER_AUTH_URL(path: string): string {
    return `${environment.serverUrl}auth/${path}`;
  }
  // //Authentication Endpoints
  // auth: object = {
  //   register: `${this.SERVER_AUTH_URL}/register`,
  //   login: `${this.SERVER_AUTH_URL}/login`,
  //   verify: `${this.SERVER_AUTH_URL}/verify`,
  //   updateResults: `${this.SERVER_AUTH_URL}/updateResults`,
  // }

  constructor() { }

  //Get current Token 
  // getToken = () => {
  //   console.log('ingetToken');
  //   let hasCookie = localStorage.getItem('sid');
  //   if (!hasCookie) {
  //     return null;
  //   }
  //   const {_token} = JSON.parse(hasCookie);
  //   console.log(_token);
    
  //   if (_token) {
  //     return _token;
  //   }
  // }

  //   //LOCAL USER SERVICES - optional
  //  localUser = {
  //   saveUser(userInfo:Object) {
  //       localStorage.setItem('sid', JSON.stringify(userInfo));
  //   },
  //   getUser() {
  //       const user = localStorage.getItem('sid');
  //       return user ? JSON.parse(user) : null;
  //   },
  //   clearUser() {
  //       localStorage.removeItem('sid');
  //   }
  // }
}
