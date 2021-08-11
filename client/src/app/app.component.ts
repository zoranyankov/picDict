import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'picDict';
  currUser: any = null;
  isLogged: boolean = false
  constructor(private _auth: AuthService) {
    // this._auth.currentUser$.pipe(switchMap(user => this._auth.verify({username: user?.username || '', token: user?.token || ''})))
    // this._auth.isLoggedIn$.subscribe(isLogged => {
    //   this.isLogged = isLogged;
    // })
    // let cookie = localStorage.getItem('sid');
    // let {username, token} = cookie? JSON.parse(cookie) : {username: '', token: ''};
    // if(!cookie || !username || !token) {
    //   this._auth.authenticateUser(null);
    // }
    // let user = cookie? JSON.parse(cookie) : null;
    // this._auth.verify(user).subscribe(res => {
    //   if(!res) {this._auth.authenticateUser(null)}
    // })
    let cookie = localStorage.getItem('sid');
    try {
      let { username, token } = cookie && JSON.parse(cookie) ? JSON.parse(cookie) : { username: '', token: '' };
      if (!cookie || !username || !token) {
        // this._auth.authenticateUser(null);
        throw new Error('Invalid Token');
      }
    } catch (error) {
      this._auth.authenticateUser(null);
      return;
    }
    let user = cookie ? JSON.parse(cookie) : null;
    console.log(user);

    this._auth.verify(user).subscribe(res => {
      console.log(res);

      if (!res || res.result == false) { return this._auth.authenticateUser(null); }

      this._auth.authenticateUser(user)
    })
    // // this.isLogged = this._auth.getLoggedUserId() ? true : false;
    // this.isLogged = !!this._auth.isLoggedIn$.pipe(map(isLoggedIn => isLoggedIn));
    this._auth.isLoggedIn$.subscribe(isLoggedIn => this.isLogged = isLoggedIn);
  }

  ngOnInit() {
    // let cookie = localStorage.getItem('sid');
    // let {username, token} = cookie? JSON.parse(cookie) : {username: '', token: ''};
    // if(!cookie || !username || !token) {
    //   this._auth.authenticateUser(null);
    // }
    // let user = cookie? JSON.parse(cookie) : null;
    // console.log(user);

    // this._auth.verify(user).subscribe(res => {
    //   console.log(res);

    //   if(!res || res.result==false) {return this._auth.authenticateUser(null);}

    //   this._auth.authenticateUser(user)
    // })

    // this.isLogged = this._auth.getLoggedUserId() ? true : false;
  }
}