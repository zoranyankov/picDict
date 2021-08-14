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
    
    // Check if there is record (from BackEnd) in local storage and if yes - checks token validity
    let storage = localStorage.getItem('sid');
    // If there is invalid format of the storage - clears it
    try {
      let { username, token } = storage && JSON.parse(storage) ? JSON.parse(storage) : { username: '', token: '' };
      if (!storage || !username || !token) {
        this._auth.authenticateUser(null);
        localStorage.removeItem('sid');
        throw new Error('Invalid Token');
      }
    } catch (error) {
      this._auth.authenticateUser(null);
      localStorage.removeItem('sid');
      return;
    }
    let user = storage ? JSON.parse(storage) : null;
    console.log(user);

    // If there is a valid storage format - verifies the validity of the token
    this._auth.verify(user).subscribe(res => {
      console.log(res);

      if (!res || res.result == false) { return this._auth.authenticateUser(null); }

      this._auth.authenticateUser(user)
    })
  }
}