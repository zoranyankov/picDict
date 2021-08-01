import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigService {

  // SERVER_AUTH_URL: string = `${environment.serverUrl}auth`;
  API_QUESTION_URL: string = `${environment.serverUrl}api/questions`;
  API_RESULT_URL: string = `${environment.serverUrl}api/results`;
  PEXELS_API_URL: string = 'https://opentdb.com/api.php';
  
  SERVER_AUTH_URL(path:string) : string {
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
  getToken = () => {
    const hasToken = JSON.parse(localStorage.getItem('sid') || '');
    if (!hasToken) {
      return null;
    } else if (!hasToken.hasOwnProperty('token')) {
      return null;
    }
    return hasToken.token;
  }
  
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
