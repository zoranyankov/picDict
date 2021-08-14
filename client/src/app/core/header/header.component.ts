import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+state';
import { selectAuth, selectUsername } from 'src/app/+state/selectors';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  // isLogged: Boolean = false;
  isLogged$ = this._store.select(selectUsername)
  //   {
  //   // console.log(s.auth.isLogged);
  //   // return (s && s.auth.username != '')? true : false ;
  //   return s.auth;
  // })
  constructor(private _auth: AuthService, private _store: Store<IAppState>) { }

  ngOnInit(): void {
  // this.isLogged = this._auth.getLoggedUserId() ? true : false;
  // this._auth.isLoggedIn$.subscribe(isLogged => {
  //   this.isLogged = isLogged;
  // })
  // this.isLogged$.subscribe((s) => console.log(s.auth))
  
  }
}