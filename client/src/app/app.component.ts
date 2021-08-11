import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'picDict';
  currUser: any = null;
  constructor(private _auth: AuthService) {
    
    let cookie = localStorage.getItem('sid');
    try {
      let { username, token } = cookie && JSON.parse(cookie) ? JSON.parse(cookie) : { username: '', token: '' };
      if (!cookie || !username || !token) {
        this._auth.authenticateUser(null);
        localStorage.removeItem('sid');
        throw new Error('Invalid Token');
      }
    } catch (error) {
      this._auth.authenticateUser(null);
      localStorage.removeItem('sid');
      return;
    }
    let user = cookie ? JSON.parse(cookie) : null;
    console.log(user);

    this._auth.verify(user).subscribe(res => {
      console.log(res);

      if (!res || res.result == false) { return this._auth.authenticateUser(null); }

      this._auth.authenticateUser(user)
    })
  }
}